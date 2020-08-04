import React from "react"
import Grid from "@material-ui/core/Grid"
import appStyles from "../../style/styles.js"
import clsx from "clsx"
import Main from "./Main.jsx"
import Dictionary from "./Dictionary.jsx"
import WorkOut from "./WorkOut.jsx"
import Forum from "./Forum.jsx"
import Profile from "./Profile.jsx"
import {Switch, Route } from 'react-router-dom'

const Content = ({open}) => {
    const contentStyles = appStyles()
    return (
        <Grid container direction={'column'}
              className={clsx(contentStyles.content, {
                  [contentStyles.contentShift]: open,
              })}>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/dictionary' component={Dictionary}/>
                <Route path='/workout' component={WorkOut}/>
                <Route path='/forum' component={Forum}/>
                <Route path='/profile' component={Profile}/>
            </Switch>
        </Grid>
    )
}

export default Content