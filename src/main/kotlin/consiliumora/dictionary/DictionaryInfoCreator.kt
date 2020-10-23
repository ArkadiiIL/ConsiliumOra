package consiliumora.dictionary

import consiliumora.domain.dictionary.Dictionary
import consiliumora.domain.dictionary.Word

interface DictionaryInfoCreator {
    fun create(dictionary: Dictionary): DictionaryInfo
    fun getWords(words: MutableList<WordInfo>, dictionary: Dictionary): MutableList<Word>
}