import React from "react"
import Grid from "@material-ui/core/Grid"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Footer from "./Footer.jsx"
import MenuDrawer from "./MenuDrawer.jsx"
import  { useState } from 'react'


const App = () => {
    const[open, setOpen] = useState(false)
        return(
            <Grid container direction={'column'}>
                <Grid item>
                    <Header open={open} setOpen={setOpen} />
                </Grid>
                <Grid item>
                    <MenuDrawer open={open} setOpen={setOpen}/>
                </Grid>
                <Grid item>
                    <Content open={open}/>
                </Grid>
                <Grid item>
                    <Footer open={open}r/>
                </Grid>
            </Grid>
    )
}
export default App