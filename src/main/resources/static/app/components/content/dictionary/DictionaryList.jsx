import React from "react"
import {get_dictionaries} from "../../../api/get_dictionaries"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import PersonIcon from "@material-ui/icons/Person"
import DeleteIcon from "@material-ui/icons/Delete"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import {Link} from "react-router-dom"
import {delete_dictionary} from "../../../api/delete_dictionary";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexWrap: "wrap"
    },
    card: {
        width: "40%",
        margin: "2%"
    },
    title: {
        fontSize: "200%",
        fontWeight: "600"
    },
    languages: {
        color: "#505D65",
        fontStyle: "italic",
        fontSize: "130%"
    },
    description: {
        color: "#636B70",
        fontStyle: "italic",
        fontSize: "100%"
    }
}))

const DictionaryList = ({user, searchState}) => {
    const classes = useStyles()
    const[dictionaryList, updateDictionaryList] = React.useState([])
    React.useEffect(() => {
        get_dictionaries().then(
            list => {
                updateDictionaryList(list)
            }
        )
    },[])

    const handleDeleteDictionary = (id, dictionaryIndex) => {
        return () => {
            delete_dictionary(id).then(response => {
                console.log(response.status)
            })
            updateDictionaryList(
                [
                    ...dictionaryList.slice(0, dictionaryIndex),
                    ...dictionaryList.slice(dictionaryIndex + 1, dictionaryList.length)
                ]
            )
        }
    }

    const list = dictionaryList
        .filter((dictionary) => {
            if(searchState.publicity !== "all") {
                if(dictionary.publicity.toLowerCase() !== searchState.publicity) return false
            }
            if(searchState.template !== "") {
                return dictionary.name.toLowerCase().includes(searchState.template.toLowerCase())
            }
            return true

        })
        .map(((dictionary, dictionaryIndex) =>
            <Card
                key={dictionaryIndex}
                className={classes.card}
            >
                <CardContent>
                    <Typography className={classes.title}>
                        {dictionary.name}
                    </Typography>
                    <Typography className={classes.languages}>
                        {dictionary.firstLanguage + " — " + dictionary.secondLanguage}
                    </Typography>
                    <Typography className={classes.description}>
                        {dictionary.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"
                            component={Link}
                            to={"dictionary/" + dictionary.id}
                    >
                        <OpenInNewIcon/>
                        <Typography>Open</Typography>
                    </Button>
                    {
                     user.id === dictionary.author.id &&
                     <Button size="small"
                             onClick={handleDeleteDictionary(dictionary.id, dictionaryIndex)}
                     >
                         <DeleteIcon/>
                         <Typography>Delete</Typography>
                     </Button>
                    }
                    <Button size="small">
                        <PersonIcon/>
                        <Typography>{dictionary.author.username}</Typography>
                    </Button>
                </CardActions>
            </Card>
    ))
    return (
        <Container>
        <div
             className={classes.box}
        >
            {list}
        </div>
        </Container>
    )
}

export default DictionaryList