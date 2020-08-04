import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './style/theme.js'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from "./components/content/Main.jsx"
import Dictionary from "./components/content/Dictionary.jsx"
import WorkOut from "./components/content/WorkOut.jsx"
import Forum from "./components/content/Forum.jsx"
import Profile from "./components/content/Profile.jsx"


ReactDOM.render(
    <ThemeProvider  theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
    document.getElementById("root"))