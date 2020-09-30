export const get_dictionary = async (id) => {
    const response = await fetch("/dictionary/" + id)
    if(response.status === 200) {
        return await response.json()
    }
    else throw new Error(`Error ${response.status}`)
}