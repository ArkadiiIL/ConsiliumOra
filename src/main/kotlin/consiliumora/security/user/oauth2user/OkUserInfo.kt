package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

class OkUserInfo(attributes: MutableMap<String,Any>, role: UserRole): OAuth2UserInfo(attributes, role) {
    override val providerId = attributes["uid"] as String
    override var userName = "${attributes["first_name"]} ${attributes["last_name"]}"
    override var email = if(attributes["email"] != null)
    {
        attributes["email"] as String
    } else
    {
        ""
    }
    override var img = attributes["pic_3"] as String
    override val provider = Providers.OK

}