package consiliumora.security.user

import com.fasterxml.jackson.annotation.JsonIgnore
import consiliumora.domain.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.core.user.OAuth2User

class UserPrincipal: OAuth2User, UserDetails {
    private val id: Long
    private val name: String
    private val username: String
    private val role: GrantedAuthority
    private val img: String?
    @JsonIgnore
    private val password: String
    @JsonIgnore
    private val attributes: MutableMap<String, Any>
    constructor(user: User)
    {
        id = user.id
        name = user.providerId
        username = user.username
        password = user.password
        attributes = HashMap()
        img = user.img
        role = SimpleGrantedAuthority(user.role.name)
    }
    constructor(user: User, attributes: MutableMap<String, Any>)
    {
        id = user.id
        name = user.providerId
        username = user.username
        password = user.password
        img = user.img
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

    fun getImg(): String? = img

    fun getId(): Long = id
}