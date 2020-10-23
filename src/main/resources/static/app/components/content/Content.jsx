import React from "react"
import Grid from "@material-ui/core/Grid"
import appStyles from "../../style/styles.js"
import clsx from "clsx"
import Main from "./Main.jsx"
import WorkOut from "./WorkOut.jsx"
import Forum from "./Forum.jsx"
import Profile from "./Profile.jsx"
import {Switch, Route } from "react-router-dom"
import Login from "../login/Login.jsx"
import Registration from "../login/Registration.jsx"
import MainDictionary from "./dictionary/create/MainDictionary.jsx"
import DictionaryMenu from "./dictionary/DictionaryMenu.jsx"
import Status from "./dictionary/create/status";

const Content = ({open, user}) => {
    const contentStyles = appStyles()
    return (
        <Grid container direction={"column"}
              className={clsx(contentStyles.content, {
                  [contentStyles.contentShift]: open,
              })}>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/workout" component={WorkOut}/>
                <Route path="/forum" component={Forum}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route exact path="/dictionary">
                    <DictionaryMenu user={user}/>
                </Route>
                <Route path="/dictionary/create">
                    <MainDictionary user={user} status={Status.CREATE}/>
                </Route>
                <Route path="/dictionary/:id">
                    <MainDictionary user={user} status={Status.UPDATE}/>
                </Route>
            </Switch>
        </Grid>
    )
}

export default Content