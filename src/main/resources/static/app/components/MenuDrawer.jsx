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
import {Button} from "@material-ui/core"
import {Link} from "react-router-dom"

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
                <ListItem button key={"Main Page"}>
                    <Button classes={{label: menuDrawerStyles.menuItemButtonLabel}} color="primary" component={Link} to="/">
                        Main Page
                    </Button>
                </ListItem>
                <ListItem button key={"My Dictionary"}>
                    <Button classes={{label: menuDrawerStyles.menuItemButtonLabel}} color="primary" component={Link} to="/dictionary">
                        My Dictionary
                    </Button>
                </ListItem>
                <ListItem button key={"WorkOut"}>
                    <Button classes={{label: menuDrawerStyles.menuItemButtonLabel}} color="primary" component={Link} to="/workout">
                        WorkOut
                    </Button>
                </ListItem>
                <ListItem button key={"Forum"}>
                    <Button classes={{label: menuDrawerStyles.menuItemButtonLabel}} color="primary" component={Link} to="/forum">
                        Forum
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    )
}
export default MenuDrawer