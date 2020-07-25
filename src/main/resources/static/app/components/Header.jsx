import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import logoStyle from "../style/logostyle.js"
import DrawerButton from "./DrawerButton.jsx"
import appStyles from "../style/styles.js"
import clsx from "clsx"



const Header = (props) => {
    const appBarStyles = appStyles()
    const logo = logoStyle()
    return(
        <AppBar position={'fixed'}
                className={clsx(appBarStyles.appBar, {
                    [appBarStyles.appBarShift]: props.open,
                })}>
        <Toolbar>
            <DrawerButton open={props.open} setOpen={props.setOpen}/>
            <Typography className={logo.myFontStyle}>
                ConsiliumOra
            </Typography>
        </Toolbar>
    </AppBar>
    )
}

export default Header