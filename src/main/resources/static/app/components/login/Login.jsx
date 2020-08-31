import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from "@material-ui/core/IconButton"
import Fab from "@material-ui/core/Fab"
import googleImage from "./../../image/iconfinder_2_939729.png"
import facebookImage from "./../../image/iconfinder_facebook_834722.png"
import vkImage from "./../../image/iconfinder_vk_834714.png"
import githubImage from "./../../image/iconfinder_mark-github_298822.png"
import okImage from "./../../image/iconfinder_ok_2308122.png"
import {NavLink} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
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
        color: '#344955'
    }
}));

const Login = () => {
    const classes = useStyles();

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
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
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