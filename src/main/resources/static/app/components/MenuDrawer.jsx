import React from "react"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useTheme } from '@material-ui/core/styles'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import appStyles from "../style/styles.js"

const MenuDrawer = (props) => {
    const menuDrawerStyles = appStyles()
    const handleDrawerClose = () => {
        props.setOpen(false)
    }
    return (
        <Drawer
            className={menuDrawerStyles.menuDrawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: menuDrawerStyles.drawerPaper
            }}
        >
            <div className={menuDrawerStyles.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {useTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key={'Main Page'}>
                    <ListItemText primary={'Main Page'}/>
                </ListItem>
                <ListItem button key={'My Dictionary'}>
                    <ListItemText primary={'My Dictionary'}/>
                </ListItem>
                <ListItem button key={'WorkOut'}>
                    <ListItemText primary={'WorkOut'}/>
                </ListItem>
                <ListItem button key={'Forum'}>
                    <ListItemText primary={'Forum'}/>
                </ListItem>
                <ListItem button key={'User Page'}>
                    <ListItemText primary={'User Page'}/>
                </ListItem>
            </List>
        </Drawer>
    )
}
export default MenuDrawer