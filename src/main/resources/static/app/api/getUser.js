export const getUser = async () => {
   const response = await fetch("/user")
        if(response.status === 200) {
            return await response.json()
        }
    else throw new Error(`Error ${response.status}`)
}

export default getUser()
