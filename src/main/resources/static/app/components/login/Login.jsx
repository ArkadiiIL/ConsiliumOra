import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import googleImage from "./../../image/iconfinder_2_939729.png"
import facebookImage from "./../../image/iconfinder_facebook_834722.png"
import vkImage from "./../../image/iconfinder_vk_834714.png"
import githubImage from "./../../image/iconfinder_mark-github_298822.png"
import okImage from "./../../image/iconfinder_ok_2308122.png"
import {NavLink} from "react-router-dom"
import {login_user} from "../../api/login_user";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(70)
    },
    textFieldText: {
        color: "#344955"
    },
    error: {
        fontWeight: 700,
        fontSize: "1.5rem",
        color: "#f44336"
    }
}));

const Login = () => {
    const classes = useStyles()
    const[loginError, updateLoginError] = React.useState(false)
    const [submitError, updateSubmitError] = React.useState(false)
    const [useEmail, updateUseEmail] = React.useState(false)
    const [usePassword, updateUsePassword] = React.useState(false)
    const [formData, updateFormData] = React.useState({
        email: "",
        password: "",
        remember: false

    })
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
        updateLoginError(false)
        if(e.target.name === "email") updateUseEmail(true)
        if(e.target.name === "password") updateUsePassword(true)
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }
    const boxChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name] : !formData.remember
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(emailCheck() === ""
            && passwordCheck() === ""
            && formData.email !== ""
            && formData.password !== ""
        ) {
            login_user(formData).then(responseStatus => {
                if(responseStatus === 200) {
                    window.location = "/"
                } else {
                    updateLoginError(true)
                }
                }
            )
        } else {
            updateSubmitError(true)
        }

    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container} >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="primary">
                    Sign in
                </Typography>
                <Box>
                    <Button
                        href="/oauth2/authorization/google"
                        startIcon={<Avatar src={googleImage}/>}
                    />
                    <Button
                        href="/oauth2/authorization/facebook"
                        startIcon={<Avatar src={facebookImage}/>}
                    />
                    <Button
                        href="/oauth2/authorization/github"
                        startIcon={<Avatar src={githubImage}/>}
                    />
                    <Button
                        href="/oauth2/authorization/vk"
                        startIcon={<Avatar src={vkImage}/>}
                    />
                    <Button
                        href="/oauth2/authorization/ok"
                        startIcon={<Avatar src={okImage}/>}
                    />
                </Box>
                {submitError &&
                <Typography className={classes.error}>
                    Please, fill all fields correct!
                </Typography> }
                {loginError &&
                <Typography className={classes.error}>
                    Email or password is not correct!
                </Typography> }
                <form className={classes.form} noValidate>
                    <TextField
                        color="primary"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{className: classes.textFieldText}}
                        onChange={handleChange}
                        error={emailCheck() !== ""}
                        helperText={emailCheck()}
                    />
                    <TextField
                        color="primary"
                        variant="outlined"
                        margin="normal"
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
                    <FormControlLabel
                        control={<Checkbox
                            value={true}
                            color="primary"
                            name="remember"
                            onChange={boxChange}
                        />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" component={NavLink} to="/registration">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login