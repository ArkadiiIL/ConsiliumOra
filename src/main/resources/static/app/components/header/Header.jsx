import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import logoStyle from "../../style/logostyle.js"
import DrawerButton from "./DrawerButton.jsx"
import appStyles from "../../style/styles.js"
import clsx from "clsx"
import LoginButton from "./LoginButton.jsx";



const Header = ({open, setOpen, user}) => {
    const appBarStyles = appStyles()
    const logo = logoStyle()
    return(
        <AppBar position={"fixed"}
                className={clsx(appBarStyles.appBar, {
                    [appBarStyles.appBarShift]: open,
                })}>
        <Toolbar>
            <DrawerButton open={open} setOpen={setOpen}/>
            <Typography className={logo.myFontStyle}>
                ConsiliumOra
            </Typography>
            <LoginButton user={user}/>
        </Toolbar>
    </AppBar>
    )
}

export default Header