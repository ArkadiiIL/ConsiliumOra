import React from "react"
import Grid from "@material-ui/core/Grid"
import appStyles from "../style/styles.js"
import clsx from "clsx"

const Content = (open) => {
    const contentStyles = appStyles()
    return (
        <Grid container direction={'column'}
              className={clsx(contentStyles.content, {
                  [contentStyles.contentShift]: open,
              })}>

        </Grid>
    )
}

export default Content