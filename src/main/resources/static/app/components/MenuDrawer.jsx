import React from "react"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import {useTheme} from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import appStyles from "../style/styles.js"
import {NavLink} from "react-router-dom"
import ListItemText from "@material-ui/core/ListItemText"

const MenuDrawer = ({open, setOpen}) => {
    const menuDrawerStyles = appStyles()
    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <Drawer
            className={menuDrawerStyles.menuDrawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: menuDrawerStyles.drawerPaper
            }}
        >
            <div className={menuDrawerStyles.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {useTheme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key={"Main Page"} component={NavLink} to="/">
                    <ListItemText primary={"Main Page"} classes={{primary: menuDrawerStyles.menuDrawerListItemText}}/>
                </ListItem>
                <ListItem button key={"My Dictionary"} component={NavLink} to="/dictionary">
                    <ListItemText primary={"My Dictionary"} classes={{primary: menuDrawerStyles.menuDrawerListItemText}}/>
                </ListItem>
                <ListItem button key={"WorkOut"} component={NavLink} to="/workout">
                    <ListItemText primary={"WorkOut"} classes={{primary: menuDrawerStyles.menuDrawerListItemText}}/>
                </ListItem>
                <ListItem button key={"Forum"} component={NavLink} to="/forum">
                    <ListItemText primary={"Forum"} classes={{primary: menuDrawerStyles.menuDrawerListItemText}}/>
                </ListItem>
            </List>
        </Drawer>
    )
}
export default MenuDrawer