import React from "react"
import PleaseLogin from "./PleaseLogin.jsx";
import UserMenu from "./UserMenu.jsx";

const LoginButton = ({user}) => {
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