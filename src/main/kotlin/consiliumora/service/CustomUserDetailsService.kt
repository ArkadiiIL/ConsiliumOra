package consiliumora.service

import consiliumora.domain.User
import consiliumora.repo.UserRepo
import consiliumora.security.user.UserPrincipal
import consiliumora.security.user.oauth2user.Providers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(@Autowired val userRepo: UserRepo): UserDetailsService {
    override fun loadUserByUsername(email: String?): UserDetails {
        if(email != null)
        {
            val user = userRepo.findByProviderAndEmail(Providers.LOCALE, email)
                ?: throw UsernameNotFoundException("Username cannot be find")
            return getUserDetails(user)

        } else {
            throw UsernameNotFoundException("Username cannot be null")
        }

    }

    private fun getUserDetails(user: User): UserDetails {
        return UserPrincipal(user)
    }
}