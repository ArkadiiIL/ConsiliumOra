import React from "react"
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core"
import appStyles from "../../style/styles.js"
import { Link } from "react-router-dom"


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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {user.username}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Button classes={{label: styles.menuItemButtonLabel}} color="primary" component={Link} to='/profile'>
                        Profile
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button classes={{label: styles.menuItemButtonLabel}} color="primary" href="/logout">
                            Logout
                    </Button>
                </MenuItem>
            </Menu>
        </div>
        </React.Fragment>
    )
}

export default UserMenu