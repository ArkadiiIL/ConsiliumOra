import React from "react"
import Button from "@material-ui/core/Button"
import appStyles from "../../style/styles.js"
import {Typography} from "@material-ui/core"
import {NavLink} from "react-router-dom"

const PleaseLogin = () => {
    const styles = appStyles()
    return (
        <Button color="inherit" component={NavLink} to="/login">
            <Typography className={styles.userMenuButton}>
                Login
            </Typography>
        </Button>
    )
}
export default PleaseLogin