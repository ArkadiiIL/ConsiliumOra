import React, {useEffect, useState} from "react"
import Header from "./header/Header.jsx"
import Content from "./content/Content.jsx"
import Footer from "./Footer.jsx"
import MenuDrawer from "./MenuDrawer.jsx"
import getUser from "../api/get_user.js"
import {BrowserRouter, Switch} from "react-router-dom"
import {Container} from "@material-ui/core"


const App = () => {
    const[openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const[user, setUser] = useState(userData)
    return(
            <BrowserRouter>
                <Switch>
                    <React.Fragment>
                <Container maxWidth="lg">
                    <Header open={openMenuDrawer} setOpen={setOpenMenuDrawer} user={user} />
                    <MenuDrawer open={openMenuDrawer} setOpen={setOpenMenuDrawer} user={user}/>
                    <Content open={openMenuDrawer} user={user}/>
                    <Footer open={openMenuDrawer}/>
                </Container>
                    </React.Fragment>
                </Switch>
            </BrowserRouter>
    )
}
export default App