package consiliumora.service

import consiliumora.domain.User
import consiliumora.domain.UserRole
import consiliumora.exception.EmailTakenException
import consiliumora.repo.UserRepo
import consiliumora.security.user.UserInfo
import consiliumora.security.user.oauth2user.Providers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserRegistrationService(@Autowired private val userRepo: UserRepo,
                              @Autowired private val passwordEncoder: PasswordEncoder
) {

    fun registration(userInfo: UserInfo) {
        val checkUser = userRepo.findByProviderAndEmail(Providers.LOCALE, userInfo.email)
        if(checkUser != null) {
            throw EmailTakenException("Email ${userInfo.email} already taken")
        }
       val user = userRepo.save(getUser(userInfo))
        updateProviderId(user)

    }

    private fun updateProviderId(user: User) {
        user.providerId = user.id.toString()
        userRepo.save(user)
    }

    private fun getUser(userInfo: UserInfo): User {
        return User(
            username = "${userInfo.firstName} ${userInfo.lastName}",
            email = userInfo.email,
            password = passwordEncoder.encode(userInfo.password),
            providerId = "",
            provider = Providers.LOCALE,
            role = UserRole.ROLE_USER
        )
    }
}