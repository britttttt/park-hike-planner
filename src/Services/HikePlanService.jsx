export const getMonths = () => {
    return fetch(`http://localhost:8088/months`).then((res) => res.json())
}


