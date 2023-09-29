export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}


export const createJoke = async (jokeText) => {

    const jokeObject = {
        "text": jokeText,
        "told": false
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObject)
    }
    const response = await fetch("http://localhost:8088/jokes", postOptions)

}

export const toggleToUntold = async (jokeId, jokeText, jokeTold) => {

    let url1 = `http://localhost:8088/jokes/${jokeId}`

    const toggleToUntold = {
        "id": parseInt(jokeId),
        "text": jokeText,
        "told": !jokeTold
    }

    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(toggleToUntold)
    }

    await fetch(url1, putOptions)
}

export const deleteJoke = async (jokeId) => {
    const url = `http://localhost:8088/jokes/${jokeId}`;

    const deleteOptions = {
        method: "DELETE",
    };

    await fetch(url, deleteOptions);
}
