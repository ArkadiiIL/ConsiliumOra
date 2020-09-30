package consiliumora.repo

import consiliumora.domain.User
import consiliumora.domain.dictionary.Dictionary
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DictionaryRepo: JpaRepository<Dictionary?, Long> {
    fun findDictionaryById(id: Long): Dictionary?
}