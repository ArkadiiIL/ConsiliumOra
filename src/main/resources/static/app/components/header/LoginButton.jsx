import React from "react"
import PleaseLogin from "./PleaseLogin.jsx";
import UserMenu from "./UserMenu.jsx";

const LoginButton = ({user}) => {
    console.log("LoginButton")
    console.log(user)
    console.log("LoginButton")
    console.log(user.name === "Unknown")
    if(user.name === "Unknown") {
        return (
            <PleaseLogin/>
        )
    }
    else
    {
        return (
            <UserMenu user={user}/>
        )
    }

}

export default LoginButton