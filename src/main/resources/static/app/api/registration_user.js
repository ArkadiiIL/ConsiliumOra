import Cookies from "js-cookie"

export const registration_user = async (formData) => {
     const response = await fetch("/user", {
         method: "POST",
         mode: "cors",
         credentials: "same-origin",
         headers: {
             "Content-Type": "application/json",
             "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
         },
         body: JSON.stringify(formData)
     })
    return response.status
}