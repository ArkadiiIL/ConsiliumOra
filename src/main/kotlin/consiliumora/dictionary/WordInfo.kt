package consiliumora.dictionary

data class WordInfo (
    val name: String,
    val translations: MutableList<TranslateInfo> = mutableListOf()
)