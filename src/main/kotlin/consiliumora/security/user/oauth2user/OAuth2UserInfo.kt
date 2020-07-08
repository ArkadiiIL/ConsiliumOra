package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

abstract class OAuth2UserInfo(val attributes: MutableMap<String, Any>, var role: UserRole){
   abstract val providerId: String
   abstract var userName: String
   abstract var email: String
   abstract var img: String
   abstract val provider: Providers
}