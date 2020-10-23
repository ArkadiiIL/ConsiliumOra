package consiliumora.service

import consiliumora.dictionary.DictionaryInfo
import consiliumora.dictionary.DictionaryInfoCreator
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
                        @Autowired val dictionaryRepo: DictionaryRepo,
                        @Autowired val dictionaryInfoCreator: DictionaryInfoCreator
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
        return dictionaryInfoCreator.create(dictionary)
    }

    fun updateDictionary(id: Long, userId: Long, dictionaryInfo: DictionaryInfo) {
        val dictionary = dictionaryRepo.findDictionaryById(id)
            ?: throw DictionaryNotFoundException("Dictionary with id:${id} not exist!")
        if(dictionary.author.id != userId)
            throw IllegalRequestException("Author id:${id} doesn't match with user id:${userId}")
        update(dictionary, dictionaryInfo)
        dictionaryRepo.save(dictionary)
    }

    private fun update(dictionary: Dictionary, dictionaryInfo: DictionaryInfo) {
        dictionary.name = dictionaryInfo.name
        dictionary.description = dictionaryInfo.description
        dictionary.firstLanguage = dictionaryInfo.firstLanguage
        dictionary.secondLanguage = dictionaryInfo.secondLanguage
        dictionary.publicity = dictionaryInfo.publicity
        dictionary.words.clear()
        dictionary.words.addAll(dictionaryInfoCreator.getWords(dictionaryInfo.words, dictionary))
    }

    fun getAll(id: Long): List<DictionaryInfo> {
        return dictionaryRepo.findDictionaryByAuthorIdOrPublicity(id, Publicity.PUBLIC).map {dictionary ->
            dictionaryInfoCreator.create(dictionary)
        }
    }

    fun deleteDictionary(id: Long, userId: Long) {
        val dictionary = dictionaryRepo.findDictionaryById(id)
            ?: throw DictionaryNotFoundException("Dictionary with id:${id} not exist!")
        if(dictionary.author.id != userId) throw IllegalRequestException("Author id:${id} doesn't match with user id:${userId}")
        dictionaryRepo.delete(dictionary)
    }
}