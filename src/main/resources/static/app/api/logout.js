import Cookies from "js-cookie"
export const logout = async () => {
    const response = fetch("/logout", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/none",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        }
    })
    return (await response).status
}