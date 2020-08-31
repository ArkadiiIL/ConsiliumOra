package consiliumora.domain

import consiliumora.security.user.oauth2user.Providers
import net.minidev.json.annotate.JsonIgnore
import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,
    @Column(nullable = false)
    var username: String,
    @Column(nullable = false)
    var email: String,
    @Column(nullable = true)
    var img: String? = null,
    @JsonIgnore
    @Column(nullable = true)
    var password: String = "",
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val provider: Providers,
    @Column(nullable = false)
    var providerId: String,
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val role: UserRole) :Serializable