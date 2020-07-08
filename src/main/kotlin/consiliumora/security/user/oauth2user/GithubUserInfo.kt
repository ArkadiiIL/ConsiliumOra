package consiliumora.security.user.oauth2user

import consiliumora.domain.UserRole

class GithubUserInfo(attributes: MutableMap<String,Any>, role: UserRole): OAuth2UserInfo(attributes, role) {
    override val providerId = (attributes["id"] as Int).toString()
    override var userName = attributes["name"] as String
    override var email = if(attributes["email"] != null)
    {
        attributes["email"] as String
    } else
    {
        ""
    }
    override var img = attributes["avatar_url"] as String
    override val provider = Providers.GITHUB

}