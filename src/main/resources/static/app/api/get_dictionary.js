export const get_dictionary = async (id) => {
    const response = await fetch("/dictionary/get/" + id)
    return response
}