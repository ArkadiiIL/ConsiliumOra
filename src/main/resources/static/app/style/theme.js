import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#344955',
            light: '#5f7481',
            dark: '#0b222c'
        },
        secondary: {
            main: '#efe6ff',
            light: '#f3ffd9',
            dark: '#c1b8b0'
        },
        text: {
            primary: '#efe6ff',
            secondary: '#344955'
        }
    },
})
export default theme