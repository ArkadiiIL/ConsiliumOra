package consiliumora.domain.dictionary

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "translations")
data class Translation (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @Column(nullable = false)
    val name: String,
    var description: String,
    @ManyToOne
    @JoinColumn(name = "word_id")
    val word: Word
) :Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false
        val that = other as Translation?
        return name == that!!.name
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + description.hashCode()
        result = 31 * result + word.hashCode()
        return result
    }
}