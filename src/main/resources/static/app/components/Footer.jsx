import React from "react"
import Grid from "@material-ui/core/Grid"
import appStyles from "../style/styles.js"
import clsx from "clsx"

const Footer = (open) => {
    const footerStyles = appStyles()
    return (
        <Grid container direction={"column"}
              className={clsx(footerStyles.content, {
                  [footerStyles.contentShift]: open,
              })}>

        </Grid>
    )
}

export default Footer