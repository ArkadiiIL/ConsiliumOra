package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

class VkUserInfo(attributes: MutableMap<String,Any>, role: UserRole): OAuth2UserInfo(attributes, role) {
    override val providerId = (attributes["id"] as Int).toString()
    override var userName = attributes["first_name"] as String
    override var email = attributes["email"] as String
    override var img = attributes["photo_max"] as String
    override val provider = Providers.GOOGLE
}