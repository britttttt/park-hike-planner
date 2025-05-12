export const getFeatures = () => {
    return fetch(`http://localhost:8088/features`).then((res) => res.json())
}


export const getTrails = () => {
    return fetch(`http://localhost:8088/trails`).then((res) => res.json())
}

