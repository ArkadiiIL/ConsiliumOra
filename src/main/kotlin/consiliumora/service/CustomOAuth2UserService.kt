package consiliumora.service

import consiliumora.domain.User
import consiliumora.repo.UserRepo
import consiliumora.security.user.UserPrincipal
import consiliumora.security.user.oauth2user.OAuth2UserInfo
import consiliumora.security.user.oauth2user.OAuth2UserInfoFactory
import consiliumora.security.user.oauth2user.Providers
import org.apache.commons.codec.digest.DigestUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestTemplate
import java.util.*
import javax.naming.AuthenticationException


@Service
class CustomOAuth2UserService(@Autowired val oAuth2UserInfoFactory: OAuth2UserInfoFactory, @Autowired val userRepo: UserRepo) :DefaultOAuth2UserService() {
    @Value("\${okKey}")
    private lateinit var okKey: String

    override fun loadUser(userRequest: OAuth2UserRequest?): OAuth2User {
        if(userRequest == null)
        {
            throw AuthenticationException()
        }
        val oAuth2User = when (userRequest.clientRegistration.registrationId) {
            "vk" -> loadVkUser(userRequest)
            "ok" -> loadOkUser(userRequest)
            else -> super.loadUser(userRequest)
        }

        val provider = Providers.valueOf(userRequest.clientRegistration.registrationId.toUpperCase())
        val userInfo = oAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2User,provider)
        return authUser(userInfo)
    }

    fun authUser(userInfo: OAuth2UserInfo): OAuth2User
    {
        var user = userRepo.findByProviderAndProviderId(userInfo.provider, userInfo.providerId)
        user = if(user == null) {
            createUser(userInfo)
        } else {
            updateUser(user, userInfo)
        }
        return UserPrincipal(user, userInfo.attributes)
    }

    private fun updateUser(user: User, userInfo: OAuth2UserInfo): User {
        user.username = userInfo.userName
        user.email = userInfo.email
        user.img = userInfo.img
        return userRepo.save(user)
    }

    fun createUser(userInfo: OAuth2UserInfo): User
    {
        return userRepo.save(User(
            username = userInfo.userName,
            email = userInfo.email,
            img = userInfo.img,
            provider = userInfo.provider,
            providerId = userInfo.providerId,
            role = userInfo.role
        ))
    }

   private fun loadVkUser(userRequest: OAuth2UserRequest): OAuth2User {
        val restTemplate = RestTemplate()
        val headers: MultiValueMap<String, String> = LinkedMultiValueMap()
        val accessToken = userRequest.accessToken.tokenValue
        headers.add("Content-Type", "application/json")
        val httpRequest: HttpEntity<*> = HttpEntity<Any?>(headers)
        var uri = userRequest.clientRegistration.providerDetails.userInfoEndpoint.uri
        val userNameAttributeName = "user_id"
        uri = uri.replace("{user_id}", userNameAttributeName + "=" + userRequest.additionalParameters[userNameAttributeName])
        uri = "$uri&access_token=$accessToken"
        try {
            val entity = restTemplate.exchange(uri, HttpMethod.GET, httpRequest, Any::class.java)
            val response = entity.body
            if(response is Map<*, *>)
            {
                val valueList = response["response"] as ArrayList<*>
                val userAttributes = valueList[0] as MutableMap<String, Any?>
                userAttributes[userNameAttributeName] = userRequest.additionalParameters[userNameAttributeName]
                userAttributes["email"] = userRequest.additionalParameters["email"]
                val authorities: Set<GrantedAuthority> =
                    Collections.singleton(OAuth2UserAuthority(userAttributes))
                return DefaultOAuth2User(authorities, userAttributes, userNameAttributeName)
            }
            else
            {
                throw ClassCastException("Can't cast response to map")
            }



        } catch (exception:HttpClientErrorException) {
            exception.printStackTrace()
            throw AuthenticationException(exception.message)
        }
    }

    private fun loadOkUser(userRequest: OAuth2UserRequest): OAuth2User {
        val restTemplate = RestTemplate()
        val headers: MultiValueMap<String, String> = LinkedMultiValueMap()
        val accessToken = userRequest.accessToken.tokenValue
        headers.add("Content-Type", "application/json")
        val httpRequest: HttpEntity<*> = HttpEntity<Any?>(headers)
        var uri = userRequest.clientRegistration.providerDetails.userInfoEndpoint.uri
        val clientSecret = userRequest.clientRegistration.clientSecret
        val secretKey = DigestUtils.md5Hex(accessToken + clientSecret)
        val sigExpression = "application_key=${okKey}format=jsonmethod=users.getCurrentUser${secretKey}"
        val sig = DigestUtils.md5Hex(sigExpression)
        uri = uri.replace("{okKey}", okKey)
        uri = uri.replace("{sig}", sig)
        uri += accessToken
        try {
            val entity = restTemplate.exchange(uri, HttpMethod.GET, httpRequest, Any::class.java)
            val response = entity.body
            if(response is Map<*, *>)
            {
                val authorities: Set<GrantedAuthority> =
                    Collections.singleton(OAuth2UserAuthority(response as MutableMap<String, Any>?))
                return DefaultOAuth2User(authorities, response, "uid")
            }
            else
            {
                throw ClassCastException("Can't cast response to map")
            }

        } catch (exception:HttpClientErrorException) {
            exception.printStackTrace()
            throw AuthenticationException(exception.message)
        }
    }
}