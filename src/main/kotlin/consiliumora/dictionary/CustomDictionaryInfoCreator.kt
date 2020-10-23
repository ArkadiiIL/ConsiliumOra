package consiliumora.dictionary

import consiliumora.domain.dictionary.Dictionary
import consiliumora.domain.dictionary.Translation
import consiliumora.domain.dictionary.Word
import consiliumora.security.user.UserInfo
import org.springframework.stereotype.Component

@Component
class CustomDictionaryInfoCreator: DictionaryInfoCreator {

    override fun create(dictionary: Dictionary): DictionaryInfo {
        return DictionaryInfo(
            id = dictionary.id,
            name = dictionary.name,
            description = dictionary.description,
            firstLanguage = dictionary.firstLanguage,
            secondLanguage = dictionary.secondLanguage,
            publicity = dictionary.publicity,
            author = UserInfo(
                id = dictionary.author.id,
                username = dictionary.author.username,
                img = dictionary.author.img
            ),
            words = createWords(dictionary.words)
        )
    }

    override fun getWords(wordInfoList: MutableList<WordInfo>, dictionary: Dictionary): MutableList<Word> {
        val words: MutableList<Word> = mutableListOf()
        wordInfoList.forEach { wordInfo ->
            val word = Word(
                name = wordInfo.name,
                dictionary = dictionary
            )
            word.translations = getTranslations(wordInfo.translations, word)
            words.add(word)
        }
        return words
    }

    private fun getTranslations(translationInfoList: MutableList<TranslateInfo>, word: Word): MutableList<Translation> {
        val translations: MutableList<Translation> = mutableListOf()
        translationInfoList.forEach { translationInfo ->
            translations.add(
                Translation(
                    name = translationInfo.translationName,
                    description = translationInfo.description,
                    word = word
                )
            )
        }
        return translations
    }

    private fun createWords(words: MutableList<Word>): MutableList<WordInfo> {
        val wordInfoList: MutableList<WordInfo> = mutableListOf()
        words.forEach { word ->
            wordInfoList.add(createWordInfo(word))
        }
        return wordInfoList
    }

    private fun createWordInfo(word: Word): WordInfo {
        return WordInfo(
            name = word.name,
            translations = createTranslations(word.translations)
        )
    }

    private fun createTranslations(translations: MutableList<Translation>): MutableList<TranslateInfo> {
        val translateInfoList: MutableList<TranslateInfo> = mutableListOf()
        translations.forEach { translation ->
            translateInfoList.add(createTranslateInfo(translation))
        }
        return translateInfoList
    }

    private fun createTranslateInfo(translation: Translation): TranslateInfo {
        return TranslateInfo(
            translationName = translation.name,
            description = translation.description
        )
    }


}