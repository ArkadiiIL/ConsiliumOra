package consiliumora.domain.dictionary

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "words")
data class Word(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,
    @Column(nullable = false)
    val name: String,
    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    @JoinColumn(name = "translation_id")
    var translations: MutableList<Translation> = mutableListOf(),
    @ManyToOne
    @JoinColumn(name = "dictionary_id")
    val dictionary: Dictionary
) :Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false
        val that = other as Word?
        return name == that!!.name
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + translations.hashCode()
        result = 31 * result + dictionary.hashCode()
        return result
    }
}