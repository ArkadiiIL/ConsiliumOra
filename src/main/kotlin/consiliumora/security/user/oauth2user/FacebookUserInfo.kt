package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

class FacebookUserInfo(attributes: MutableMap<String,Any>, role: UserRole): OAuth2UserInfo(attributes, role) {
    override val providerId = attributes["id"] as String
    override var userName = attributes["name"] as String
    override var email = attributes["email"] as String
    override var img = if(attributes.containsKey("picture")) {
        val picture = attributes["picture"] as Map<String, Any>
        if(picture.containsKey("data"))
        {
            val data = picture["data"] as Map<String,Any>
            if(data.containsKey("url")) {
                data["url"] as String
            } else ""
        } else ""
    } else ""
    override val provider = Providers.FACEBOOK
}