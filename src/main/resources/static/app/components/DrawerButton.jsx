import React from "react"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from '@material-ui/icons/Menu'
import appStyles from "../style/styles.js"
import clsx from 'clsx'
const DrawerButton = (props) => {
    const drawerButtonStyles = appStyles()
    const handleDrawerOpen = () => {
        props.setOpen(true)
    }

    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(drawerButtonStyles.menuButton, props.open && drawerButtonStyles.hide)}
            >
            <MenuIcon/>
        </IconButton>
    )
}

export default DrawerButton