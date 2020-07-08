package consiliumora.service

import consiliumora.domain.User
import consiliumora.repo.UserRepo
import consiliumora.security.user.UserPrincipal
import consiliumora.security.user.oauth2user.OAuth2UserInfo
import consiliumora.security.user.oauth2user.OAuth2UserInfoFactory
import consiliumora.security.user.oauth2user.Providers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import javax.naming.AuthenticationException

@Service
class CustomOAuth2UserService(@Autowired val oAuth2UserInfoFactory: OAuth2UserInfoFactory, @Autowired val userRepo: UserRepo) :DefaultOAuth2UserService() {
    override fun loadUser(userRequest: OAuth2UserRequest?): OAuth2User {
        if(userRequest == null)
        {
            throw AuthenticationException()
        }
        val oAuth2User = super.loadUser(userRequest)
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
}