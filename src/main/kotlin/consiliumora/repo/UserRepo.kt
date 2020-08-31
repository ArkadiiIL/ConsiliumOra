package consiliumora.repo

import consiliumora.domain.User
import consiliumora.security.user.oauth2user.Providers
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepo: JpaRepository<User?, Long> {
    fun findByProviderAndProviderId(provider: Providers, providerId: String): User?
    fun findByProviderAndEmail(provider: Providers, email: String): User?
}