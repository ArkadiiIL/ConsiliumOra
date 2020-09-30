package consiliumora.security.user

data class RegistrationInfo(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)