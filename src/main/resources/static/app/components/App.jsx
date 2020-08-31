import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"
import Header from "./header/Header.jsx"
import Content from "./content/Content.jsx"
import Footer from "./Footer.jsx"
import MenuDrawer from "./MenuDrawer.jsx"
import getUser from "../api/getUser.js"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Container} from "@material-ui/core"
import Login from "./login/Login.jsx"


const App = () => {
    useEffect(() => {
        getUser.then(user => setUser(user))
    },[user])
    const[openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const[user, setUser] = useState(userData)
    return(
            <BrowserRouter>
                <Switch>
                    <React.Fragment>
                <Container maxWidth="lg">
                    <Header open={openMenuDrawer} setOpen={setOpenMenuDrawer} user={user} />
                    <MenuDrawer open={openMenuDrawer} setOpen={setOpenMenuDrawer}/>
                    <Content open={openMenuDrawer}/>
                    <Footer open={openMenuDrawer}/>
                </Container>
                    </React.Fragment>
                </Switch>
            </BrowserRouter>
    )
}
export default App