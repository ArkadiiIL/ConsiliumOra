import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import CancelIcon from "@material-ui/icons/Cancel"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(25),
        marginTop: theme.spacing(10)
    },
    box: {
        display: "flex",
        flexDirection: "row",
        height: "auto",
        marginBottom: "5%"
    },
    wordBox: {
        width: "30%",
        marginLeft: "12%"
    },
    translateBox: {
        display: "flex",
        width: "70%",
        height: "auto",
        flexDirection: "column",
        marginLeft: "10%"
    },
    translateForm: {
        display: "flex",
        flexDirection: "column"
    },
    wordInput: {
        marginLeft: "1.3%"
    },
    translateInput: {
    },
    descriptionInput: {
        marginTop: "2%",
        marginBottom: "5%"
    },
    addWordButton: {
        marginLeft: "50%"
    },
    addTranslateButton: {
        marginLeft: "50%"
    }
}))

const DictionaryBody = ({status, words, dictionaryData, updateDictionaryData}) => {
    const classes = useStyles()

    const updateWords = (words) => {
        updateDictionaryData(
            {
                ...dictionaryData,
                words: words
            }
        )
    }

    const handleWord = (index) => {
        return (e) => {
            console.log(index)
            console.log(e.target.name)
        }
    }

    const handleAddWord = () => {
        updateWords(
            [
                ...words,
                {
                    name: "",
                    translations: [
                        {
                            translationName: "",
                            description: ""
                        }
                    ]
                }
            ]
        )
    }

    const handleAddTranslate = (wordIndex) => {
        return () => {
            updateWords(
                [
                    ...words.slice(0, wordIndex),
                    {
                        ...words[wordIndex],
                        translations: [
                ...words[wordIndex].translations,
                            {
                                translationName: "",
                                description: ""
                            }
                    ]
                    },
                    ...words.slice(wordIndex + 1, words.length)
                ]
            )
        }
    }

    const handleDeleteWord = (wordIndex) => {
        return () => {
            updateWords([
                ...words.slice(0, wordIndex),
                ...words.slice(wordIndex + 1, words.length)
            ])
        }
    }

    const handleDeleteTranslate = (wordIndex, translationIndex) => {
        return () => {
            const translation = words[wordIndex].translations
            updateWords(
                [
                    ...words.slice(0, wordIndex),
                    {
                        ...words[wordIndex],
                        translations: [
                            ...translation.slice(0, translationIndex),
                            ...translation.slice(translationIndex + 1, translation.length)

                        ]
                    },
                    ...words.slice(wordIndex + 1, words.length)
                ]
            )

        }
    }

    const list = words.map(((word, wordIndex) =>
        <div key={"w" + word.name + wordIndex.toString()}
             className={classes.box}
        >
            <Box display="flex" className={classes.wordBox}>
                <TextField
                    className={classes.wordInput}
                    label="Enter Word"
                    defaultValue={word.name}
                    name={word.name}
                    onChange={handleWord(wordIndex)}
                />
                <div>
                <IconButton
                    onClick={handleDeleteWord(wordIndex)}
                >
                    <CancelIcon
                        color="error"
                    />
                </IconButton>
                </div>
            </Box>
            <div className={classes.translateBox}>
                {
                    word.translations.map(((translation, translationIndex) =>
                                <div  className={classes.translateForm}
                                      key={"t" + translation.translationName + translationIndex.toString()}
                                >
                                    <Box display="flex">
                                        <TextField
                                            label="Translate"
                                            defaultValue={translation.translationName}
                                            name={translation.translationName}
                                        />
                                        <IconButton
                                            onClick={handleDeleteTranslate(wordIndex, translationIndex)}
                                        >
                                            <CancelIcon
                                                color="error"
                                            />
                                        </IconButton>
                                    </Box>
                                    <TextField
                                        className={classes.descriptionInput}
                                        label="Description"
                                        size="medium"
                                        defaultValue={translation.description}
                                        name={translation.description}
                                    />
                                </div>
                    ))
                }
                <div>
                <IconButton
                    className={classes.addTranslateButton}
                    onClick={handleAddTranslate(wordIndex)}
                >
                    <AddCircleIcon
                        color="primary"
                    />
                </IconButton>
                </div>
            </div>
        </div>
    ))

    return (
        <Container className={classes.container}>
            {list}
            <IconButton
                className={classes.addWordButton}
                onClick={handleAddWord}
            >
                <AddCircleIcon
                    fontSize="large"
                    color="primary"
                />
            </IconButton>
        </Container>
    )
}

export default DictionaryBody