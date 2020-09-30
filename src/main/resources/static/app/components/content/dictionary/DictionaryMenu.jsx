import React from "react"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import  { Redirect } from "react-router-dom"



const currencies = [
    {
        value: "private",
        label: "Private",
    },
    {
        value: "public",
        label: "Public",
    },
    {
        value: "all",
        label: "All",
    },
]

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(25)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    searchButton: {
        marginTop: "28px",
        width: "100px"
    },
    form: {
        width: "75%"
    },
    select: {
        marginTop: "32px"
    },
    dictionarySearch: {
        marginTop: "16px",
        width: "100%"
    },
    addDictionary: {
        marginTop: "28px",
        width: "150px"
    }

}))
const DictionaryMenu = () => {
    const classes = useStyles()
    const [currentlyType, updateCurrencyType] = React.useState("all")
    const [createDictionary, updateCreateDictionary] = React.useState(false)

    const handleCreate = (e) => {
        e.preventDefault()
        updateCreateDictionary(true)
    }

    if(createDictionary) {
        return ( <Redirect to="/dictionary/create" /> )
    } else {
        return (
            <Container id="dictionary-container"
                       component="main"
                       maxWidth="xl"
                       className={classes.container}
            >
                <CssBaseline/>
                <div className={classes.paper}>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xl>
                                <TextField size="medium"
                                           id="dictionary-search"
                                           label="Search"
                                           className={classes.dictionarySearch}
                                />
                            </Grid>
                            <Grid item>
                                <TextField select
                                           id="type-search"
                                           value={currentlyType}
                                           className={classes.select}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.searchButton}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.addDictionary}
                                    startIcon={<NoteAddIcon/>}
                                    onClick={handleCreate}
                                >
                                    Dictionary
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </div>
            </Container>
        )
    }
}

export default DictionaryMenu