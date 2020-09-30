import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router-dom"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import CreateIcon from "@material-ui/icons/Create"
import Add from "@material-ui/icons/Add"
import InputAdornment from "@material-ui/core/InputAdornment"
import CountryList from "./../../../../data/country_list.js"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import {SwapHoriz} from "@material-ui/icons"
import clsx from "clsx"
import Typography from "@material-ui/core/Typography"
import {create_dictionary} from "../../../../api/create_dictionary"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

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
    form: {
        width: "75%"
    },
    select: {
        marginTop: "32px",
        width: "150px"
    },
    dictionarySearch: {
        marginTop: "16px",
        width: "100%"
    },
    createButton: {
        marginTop: "40%",
        width: "120px"
    },
    swap: {
        marginTop: "48px"
    },
    errorIcon: {
        color: "#f44336"
    },
    errorMessage: {
        color: "#f44336",
        fontWeight: 700,
        fontSize: "1.5rem",
        marginLeft: theme.spacing(10)

    },
    switch: {
        marginTop: "30%",
        marginLeft: "10%"
    },
    switchGrid: {
        width: "20%"
    }

}))
const CreateDictionary = ({status, formData, updateFormData}) => {
    const classes = useStyles()
    const [redirect, updateRedirect] = React.useState(false)
    const [redirectUri, updateRedirectUri] = React.useState("")
    const [useName, updateUseName] = React.useState(false)
    const [errorMessage, updateErrorMessage] = React.useState("")
    const handleChange = (e) => {
        updateErrorMessage("")
        if(e.target.name === "name") updateUseName(true)
        updateFormData(
            {
                ...formData,
                [e.target.name]: e.target.value.trim()
            }
        )
    }

    const swap = (e) => {
        e.preventDefault()
        updateFormData({
            ...formData,
            firstLanguage: formData.secondLanguage,
            secondLanguage: formData.firstLanguage
        })
    }

    const checkName = () => {
        if(useName && formData.name === "") {
            return "Cannot be empty!"
        } else if(formData.name.length > 30) {
            return "Cannot be longer than 30 characters!"
        } else {
            return ""
        }
    }

    const checkDescription = () => {
        if(formData.description.length > 60) {
            return "Cannot be longer than 60 characters!"
        } else {
            return ""
        }
    }
    const publicityChange = () => {
        if(formData.publicity === "PUBLIC") {
            updateFormData({
                ...formData,
                publicity: "PRIVATE"
            })
        }
        else {
            updateFormData({
                ...formData,
                publicity: "PUBLIC"
            })
        }
    }

    const create = (e) => {
        e.preventDefault()
        if(checkName() !== "" ||
            formData.firstLanguage === "" ||
            formData.secondLanguage === ""
        ) {
            updateErrorMessage("Please, fill dictionary name and choose languages!")
        } else {
            create_dictionary(formData).then(
                response => {
                    if(response.status !== 200) {
                        response.json().then(result =>
                            updateErrorMessage(result.message)
                        )
                    } else {
                        response.json().then(result => {
                            updateRedirectUri("/dictionary/" + result)
                            updateRedirect(true)
                            updateRedirect(false)
                            }
                        )
                    }
                }
            )

        }
    }

    if(redirect) {
        return ( <Redirect to={redirectUri} /> )
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
                        <Grid item xl>
                            {errorMessage !== "" &&
                                <Typography
                                    className={classes.errorMessage}
                                >
                                    {errorMessage}
                                </Typography>
                            }
                            <TextField
                                name="name"
                                size="medium"
                                id="dictionary-name"
                                label="Dictionary name"
                                onChange={handleChange}
                                error={checkName() !== ""}
                                helperText={checkName()}
                                className={classes.dictionarySearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreateIcon
                                                className={clsx((checkName() !== "") && classes.errorIcon)}
                                            />
                                        </InputAdornment>
                                    ),
                                    value: formData.name
                                }}
                            />
                        </Grid>
                        <Grid item xl>
                            <TextField
                                name="description"
                                size="medium"
                                id="dictionary-description"
                                label="Dictionary description"
                                onChange={handleChange}
                                error={checkDescription() !== ""}
                                helperText={checkDescription()}
                                className={classes.dictionarySearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreateIcon
                                                className={clsx((checkDescription() !== "") && classes.errorIcon)}
                                            />
                                        </InputAdornment>
                                    ),
                                    value: formData.description
                                }}
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item>
                                <FormControl
                                    id="first-language"
                                    className={classes.select}
                                >
                                    <InputLabel id="select-first-language-label">First language</InputLabel>
                                    <Select
                                        labelId="select-first-language-label"
                                        id="select-first-language"
                                        value={formData.firstLanguage}
                                        name="firstLanguage"
                                        onChange={handleChange}
                                    >
                                        { CountryList()
                                            .filter((language) => (
                                                    language[0] !== formData.secondLanguage
                                                )
                                            )
                                            .map((language) => (
                                                <MenuItem key={language[1] + language[0]} value={language[0]}>
                                                    {language[0]}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    onClick={swap}
                                    className={classes.swap}
                                >
                                    <SwapHoriz/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <FormControl
                                    id="second-language"
                                    className={classes.select}
                                >
                                    <InputLabel id="select-second-language-label">Second language</InputLabel>
                                    <Select
                                        labelId="select-second-language-label"
                                        id="select-second-language"
                                        value={formData.secondLanguage}
                                        name="secondLanguage"
                                        onChange={handleChange}
                                    >
                                        { CountryList()
                                            .filter((language) => (
                                                    language[0] !== formData.firstLanguage
                                                )
                                            )
                                            .map((language) => (
                                                <MenuItem key={language[0] + language[1]} value={language[0]}>
                                                    {language[0]}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item className={classes.switchGrid}>
                                <FormControlLabel
                                    className={classes.switch}
                                    control={
                                        <Switch
                                        checked={formData.publicity !== "PUBLIC"}
                                        onChange={publicityChange} name="publicity"
                                        color="primary"
                                        />}
                                        label={formData.publicity}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.createButton}
                                    endIcon={<Add/>}
                                    onClick={create}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }

}

export default CreateDictionary