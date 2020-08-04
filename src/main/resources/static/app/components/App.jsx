import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"
import Header from "./header/Header.jsx"
import Content from "./content/Content.jsx"
import Footer from "./Footer.jsx"
import MenuDrawer from "./MenuDrawer.jsx"
import getUser from "../api/getUser.js"
import {BrowserRouter} from "react-router-dom"
import {Container} from "@material-ui/core"


const App = () => {
    useEffect(() => {
        getUser.then(user => setUser(user))
    },[user])
    const[openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const[user, setUser] = useState(userData)
    return(
        <React.Fragment>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Header open={openMenuDrawer} setOpen={setOpenMenuDrawer} user={user} />
                    <MenuDrawer open={openMenuDrawer} setOpen={setOpenMenuDrawer}/>
                    <Content open={openMenuDrawer}/>
                    <Footer open={openMenuDrawer}/>
                </Container>
            </BrowserRouter>
        </React.Fragment>
    )
}
export default App