package consiliumora.security.user

import consiliumora.domain.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.core.user.OAuth2User

class UserPrincipal: OAuth2User, UserDetails {
    private val name: String
    private val username: String
    private val password: String
    private val attributes: MutableMap<String, Any>
    private val role: GrantedAuthority
    constructor(user: User)
    {
        name = user.providerId
        username = user.username
        password = user.password
        attributes = HashMap()
        role = SimpleGrantedAuthority(user.role.name)
    }
    constructor(user: User, attributes: MutableMap<String, Any>)
    {
        name = user.providerId
        username = user.username
        password = user.password
        this.attributes = attributes
        role = SimpleGrantedAuthority(user.role.name)
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = mutableListOf(role)

    override fun <A : Any?> getAttribute(name: String?): A? = attributes[name] as A

    override fun getName(): String = name

    override fun getAttributes(): MutableMap<String, Any> = attributes

    override fun isEnabled(): Boolean = true

    override fun getUsername(): String = username

    override fun isCredentialsNonExpired(): Boolean = true

    override fun getPassword(): String = password

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true
}