package consiliumora.service

import consiliumora.domain.User
import consiliumora.domain.UserRole
import consiliumora.exception.EmailTakenException
import consiliumora.repo.UserRepo
import consiliumora.security.user.RegistrationInfo
import consiliumora.security.user.oauth2user.Providers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserRegistrationService(@Autowired private val userRepo: UserRepo,
                              @Autowired private val passwordEncoder: PasswordEncoder
) {

    fun registration(registrationInfo: RegistrationInfo) {
        val checkUser = userRepo.findByProviderAndEmail(Providers.LOCALE, registrationInfo.email)
        if(checkUser != null) {
            throw EmailTakenException("Email ${registrationInfo.email} already taken")
        }
       val user = userRepo.save(getUser(registrationInfo))
        updateProviderId(user)

    }

    private fun updateProviderId(user: User) {
        user.providerId = user.id.toString()
        userRepo.save(user)
    }

    private fun getUser(registrationInfo: RegistrationInfo): User {
        return User(
            username = "${registrationInfo.firstName} ${registrationInfo.lastName}",
            email = registrationInfo.email,
            password = passwordEncoder.encode(registrationInfo.password),
            providerId = "",
            provider = Providers.LOCALE,
            role = UserRole.ROLE_USER
        )
    }
}