package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole
import consiliumora.exception.OAuth2ProviderException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Component

@Component
class OAuth2UserInfoFactory {
    fun getOAuth2UserInfo(oAuth2User: OAuth2User, provider: Providers): OAuth2UserInfo
    {
        return when (provider) {
            Providers.GOOGLE -> GoogleUserInfo(oAuth2User.attributes, UserRole.ROLE_USER)
            Providers.FACEBOOK -> FacebookUserInfo(oAuth2User.attributes, UserRole.ROLE_USER)
            Providers.GITHUB -> GithubUserInfo(oAuth2User.attributes, UserRole.ROLE_USER)
            Providers.VK -> VkUserInfo(oAuth2User.attributes, UserRole.ROLE_USER)
            Providers.OK -> OkUserInfo(oAuth2User.attributes, UserRole.ROLE_USER)
            else -> {
                throw OAuth2ProviderException("Sorry provider is not found")
            }
        }
    }
}