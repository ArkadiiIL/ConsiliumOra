import Cookies from "js-cookie";

export const create_dictionary = async (formData) => {
    const response = await fetch("/dictionary/new", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify(formData)
    })
    return response
}
