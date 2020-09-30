package consiliumora.service

import consiliumora.dictionary.DictionaryInfo
import consiliumora.domain.User
import consiliumora.domain.dictionary.Dictionary
import consiliumora.domain.dictionary.Publicity
import consiliumora.exception.DictionaryNotFoundException
import consiliumora.exception.IllegalRequestException
import consiliumora.exception.UserNotFoundException
import consiliumora.repo.DictionaryRepo
import consiliumora.repo.UserRepo
import consiliumora.security.user.UserPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DictionaryService(@Autowired val userRepo: UserRepo,
                        @Autowired val dictionaryRepo: DictionaryRepo
) {
    fun create(dictionaryInfo: DictionaryInfo, userId: Long): Long {
        val author: User
                = userRepo.findUserById(userId)
            ?: throw UserNotFoundException("User with id:${dictionaryInfo.author.id} not exist!")
        return dictionaryRepo.save(getNewDictionary(author, dictionaryInfo)).id
    }

    private fun getNewDictionary(author: User, dictionaryInfo: DictionaryInfo): Dictionary {
        return Dictionary(
            name = dictionaryInfo.name,
            description = dictionaryInfo.description,
            firstLanguage = dictionaryInfo.firstLanguage,
            secondLanguage = dictionaryInfo.secondLanguage,
            publicity = dictionaryInfo.publicity,
            author = author
        )
    }

    fun getDictionary(id: Long, user: UserPrincipal): DictionaryInfo {
       val dictionary = dictionaryRepo.findDictionaryById(id)
           ?: throw DictionaryNotFoundException("Dictionary with id:${id} not exist!")
        if(dictionary.publicity == Publicity.PRIVATE
            && dictionary.author.id != user.getId())
            throw IllegalRequestException("Dictionary with id:${id} is PRIVATE and user:${user.getId()} is not author")
        return getDictionaryInfo(dictionary)

    }

    private fun getDictionaryInfo(dictionary: Dictionary): DictionaryInfo {
        TODO("Not yet implemented")
    }
}