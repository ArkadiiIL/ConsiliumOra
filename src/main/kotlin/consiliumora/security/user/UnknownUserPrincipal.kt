package consiliumora.security.user

import java.io.Serializable

class UnknownUserPrincipal: Serializable {
    private val name = "Unknown"
    private val username = "Unknown"

    fun getName(): String = name
    fun getUserName(): String = username
}