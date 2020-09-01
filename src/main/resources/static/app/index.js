import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App.jsx"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./style/theme.js"
import CssBaseline from "@material-ui/core/CssBaseline"


ReactDOM.render(
    <ThemeProvider  theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
    document.getElementById("root"))