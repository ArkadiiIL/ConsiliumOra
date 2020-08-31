export const registrationUser = async (userInfo) => {
     const response = await fetch("/user", {
         method: "POST",
         mode: "cors",
         credentials: "same-origin",
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(userInfo)
     })
    return response.status
}