package consiliumora.dictionary

import consiliumora.domain.dictionary.Publicity
import consiliumora.security.user.UserInfo

data class DictionaryInfo (
    val id: Long,
    val name: String,
    val description: String,
    val firstLanguage: String,
    val secondLanguage: String,
    val publicity: Publicity,
    val author: UserInfo,
    val words: MutableList<WordInfo> = mutableListOf()
)