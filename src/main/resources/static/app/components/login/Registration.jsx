import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import {registration_user} from "../../api/registration_user"
import  { Redirect } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(70)
    },
    error: {
        fontWeight: 700,
        fontSize: "1.5rem",
        color: "#f44336"
    }
}));

const Registration = () => {
    const classes = useStyles()
    const [useFirstName, updateUseFirstName] = React.useState(false)
    const [useLastName, updateUseLastName] = React.useState(false)
    const [useEmail, updateUseEmail] = React.useState(false)
    const [usePassword, updateUsePassword] = React.useState(false)
    const [submitError, updateSubmitError] = React.useState(false)
    const [redirectToLogin, updateRedirectToLogin] = React.useState(false)
    const [emailAlreadyTaken, updateEmailAlreadyTaken] = React.useState(false)
    const [formData, updateFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const firstNameCheck = () => {
        if (formData.firstName === "" && useFirstName) {
            return "Cannot be empty!"
        }
        if (formData.firstName.length > 10) {
            return "Cannot be longer than 10 characters!"
        }
        return ""
    }
    const lastNameCheck = () => {
        if (formData.lastName === "" && useLastName) {
            return "Cannot be empty!"
        }
        if (formData.lastName.length > 10) {
            return "Cannot be longer than 10 characters!"
        }
        return ""
    }
    const emailCheck = () => {
        if (formData.email === "" && useEmail) {
            return "Cannot be empty!"
        }
        if (formData.email.length > 30) {
            return "Cannot be longer than 30 characters!"
        }
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!re.test(String(formData.email).toLowerCase()) && useEmail) {
            return "Wrong email!"
        }
        return ""
    }
    const passwordCheck = () => {
        if (formData.password === "" && usePassword) {
            return "Cannot be empty!"
        }
        if (formData.password.length > 40) {
            return "Cannot be longer than 40 characters!"
        }
        return ""
    }
    const handleChange = (e) => {
        updateSubmitError(false)
        if (e.target.name === "firstName") updateUseFirstName(true)
        if (e.target.name === "lastName") updateUseLastName(true)
        if (e.target.name === "email") {
            updateUseEmail(true)
            updateEmailAlreadyTaken(false)
        }
        if (e.target.name === "password") updateUsePassword(true)
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (firstNameCheck() === ""
            && lastNameCheck() === ""
            && emailCheck() === ""
            && passwordCheck() === ""
            && formData.firstName !== ""
            && formData.lastName !== ""
            && formData.email !== ""
            && formData.password !== ""
        ) {
            registration_user(formData).then(response => {
                    if (response === 200) {
                        updateRedirectToLogin(true)
                    } else if (response === 400) {
                        updateSubmitError(true)
                    } else if (response === 409) {
                        updateEmailAlreadyTaken(true)
                    }
                }
            )
        } else {
            updateSubmitError(true)
        }
    }


    if(redirectToLogin)
    {
        return ( <Redirect to="/login" /> )
    } else {
        return (
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {submitError &&
                    <Typography className={classes.error}>
                        Please, fill all fields correct!
                    </Typography>
                    }
                    {emailAlreadyTaken &&
                    <Typography className={classes.error}>
                        Email already taken!
                    </Typography>
                    }
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                    error={firstNameCheck() !== ""}
                                    helperText={firstNameCheck()}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={handleChange}
                                    error={lastNameCheck() !== ""}
                                    helperText={lastNameCheck()}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={emailCheck() !== ""}
                                    helperText={emailCheck()}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    error={passwordCheck() !== ""}
                                    helperText={passwordCheck()}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Registration