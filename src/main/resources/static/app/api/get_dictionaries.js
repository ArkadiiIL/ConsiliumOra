export const get_dictionaries = async () => {
    const response = await fetch("/dictionary/get/all/")
    return response.json()
}