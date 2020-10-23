import React from "react"
import CreateDictionary from "./CreateDictionary.jsx"
import DictionaryBody from "./DictionaryBody.jsx"
import Container from "@material-ui/core/Container"
import {makeStyles} from "@material-ui/core/styles"
import Status from "./status";
import CircularProgress from "@material-ui/core/CircularProgress"
import {get_dictionary} from "../../../../api/get_dictionary"
import {Redirect, useParams} from "react-router-dom"
import {update_dictionary} from "../../../../api/update_dictionary"

const useStyles = makeStyles((theme) => ({
     container: {

     },
     loading: {
         marginTop: "15%",
         marginLeft: "70%"
     }
}))



const MainDictionary = ({user, status}) => {
    const classes = useStyles()
    let { id } = useParams()
    const [loading, updateLoading] = React.useState(status !== Status.CREATE)
    const [error, updateError] = React.useState(false)

    const[dictionaryData, updateDictionaryData] = React.useState({
        name: "",
        description: "",
        firstLanguage: "",
        secondLanguage: "",
        publicity: "PRIVATE",
        author: user,
        words: []
    })

    React.useEffect(() => {
        if(status === Status.UPDATE) {
            get_dictionary(id).then(result => {
                if(result.status === 200) {
                    result.json().then(data => {
                        updateDictionaryData(data)
                    })
                } else {
                    updateError(true)
                }
            })
            updateLoading(false)
        }
    }, [status])

    const updateData = (data) => {
        if(status !== Status.CREATE) {
            update_dictionary(id, data).then(result => {

            })
        }
        updateDictionaryData(data)
    }

    if(error) {
        return (
            <Redirect to="/dictionary" />
        )
    }else if(loading) {
        return (
            <Container className={classes.container}>
                <div className={classes.loading}>
                    <CircularProgress/>
                </div>
            </Container>
        )
    } else {
        return(
            <Container className={classes.container}>
                <CreateDictionary status={status}
                                  isRead={user.id !== dictionaryData.author.id}
                                  formData={dictionaryData}
                                  updateFormData={updateData}/>
                {
                    status !== Status.CREATE &&
                    <DictionaryBody isRead={user.id !== dictionaryData.author.id}
                                    words={dictionaryData.words}
                                    dictionaryData={dictionaryData}
                                    updateDictionaryData={updateData}
                    />
                }
            </Container>
        )
    }

}

export default MainDictionary

