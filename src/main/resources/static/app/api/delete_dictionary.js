import Cookies from "js-cookie";

export const delete_dictionary = async (id) => {
    const response = await fetch("/dictionary/delete/" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        }
    })
    return response
}