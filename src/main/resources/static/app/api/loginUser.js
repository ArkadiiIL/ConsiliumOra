import Cookies from "js-cookie"
export const loginUser = async (formData) => {
    const userInfo = {
        "username": formData.email,
        "password": formData.password,
        "remember-me": formData.remember
    }
    const formBody = Object.keys(userInfo)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(userInfo[key])).join('&')

    const response = await fetch("/login", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: formBody
    })
    return response.status
}
