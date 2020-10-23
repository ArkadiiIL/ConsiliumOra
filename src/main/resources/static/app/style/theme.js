import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#344955",
            light: "#5f7481",
            dark: "#0b222c"
        },
        secondary: {
            main: "#efe6ff",
            light: "#f3ffd9",
            dark: "#c1b8b0"
        },
        text: {
            primary: "#344955",
            secondary: "#5A646A"
        }
    },
})
export default theme