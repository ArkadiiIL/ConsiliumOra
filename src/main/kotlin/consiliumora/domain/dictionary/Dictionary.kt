package consiliumora.domain.dictionary

import consiliumora.domain.User
import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "dictionaries")
data class Dictionary (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,
    @Column(nullable = false)
    var name: String,
    var description: String,
    @Column(nullable = false)
    var firstLanguage: String,
    @Column(nullable = false)
    var secondLanguage: String,
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    var publicity: Publicity,
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    val author: User,
    @OneToMany
    @JoinColumn(name = "word_id")
    val words: Set<Word> = mutableSetOf()
) :Serializable