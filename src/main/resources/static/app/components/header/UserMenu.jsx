import React from "react"
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core"
import appStyles from "../../style/styles.js"
import { Link } from "react-router-dom"
import ListItemText from "@material-ui/core/ListItemText"
import {Link as MaterialLink} from "@material-ui/core"
import {Typography} from "@material-ui/core"


const UserMenu = ({user}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const styles = appStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };
    return (
        <React.Fragment>
        <Avatar src={user.img}/>
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Typography className={styles.userMenuButton}>
                    {user.username}
                </Typography>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                    <ListItemText primary={"Profile"} classes={{primary: styles.userMenuListItemText}}/>
                </MenuItem>
                <MenuItem onClick={handleClose} component={MaterialLink} href="/logout">
                    <ListItemText primary={"Logout"} classes={{primary: styles.userMenuListItemText}}/>
                </MenuItem>
            </Menu>
        </div>
        </React.Fragment>
    )
}

export default UserMenu