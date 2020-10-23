import Cookies from "js-cookie";

export const update_dictionary = async (id, formData) => {
    const response = await fetch("/dictionary/update/" + id, {
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