export const get_dictionaries = async () => {
    const response = await fetch("/dictionary/get/all/")
    // response.json().then(result => {
    //     console.log(result)
    // })
    // const response = [
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     },
    //     {
    //         id: 19142,
    //         name: "Rus - Eng",
    //         description: "Weather and nature",
    //         firstLanguage: "Russian",
    //         secondLanguage: "English",
    //         publicity: "PUBLIC",
    //         author: {}
    //     }
    //
    //
    // ]

    return response.json()
}