import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#344955',
            light: '#5f7481',
            dark: '#0b222c'
        },
        secondary: {
            main: '#f9aa33',
            light: '#ffdc65',
            dark: '#c17b00'
        },
        text: {
            primary: '#e2e2e2',
            secondary: '#344955'
        }
    },
})
export default theme