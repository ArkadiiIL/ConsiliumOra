package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

class GoogleUserInfo(attributes: MutableMap<String,Any>, role: UserRole): OAuth2UserInfo(attributes, role) {
    override val providerId = attributes["sub"] as String
    override var userName = attributes["name"] as String
    override var email = attributes["email"] as String
    override var img = attributes["picture"] as String
    override val provider = Providers.GOOGLE
}