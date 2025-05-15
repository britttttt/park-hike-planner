export const getMonths = () => {
    return fetch(`http://localhost:8088/months`).then((res) => res.json())
}


export const createHikePlan = (plan) => {
    return fetch(`http://localhost:8088/hikePlans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
    }).then(res => res.json()) 
}

export const getHikePlanById = (hikePlanId) => {
    return fetch(`http://localhost:8088/hikePlans/${hikePlanId}`)
        .then((res) => res.json())
}


export const saveHikePlan = (hikePlan) => {
    return fetch(`http://localhost:8088/hikePlans/${hikePlan.id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hikePlan)
    }).then(res => res.json())
}

export const deleteHikePlan = (hikePlanId) => {
    return fetch(`http://localhost:8088/hikePlans/${hikePlanId}`, {
        method: "DELETE"
    })
}


export const getHikePlansByUserId = (userId) => {
    return fetch (`http://localhost:8088/hikePlans?userId=${userId}`)
    .then((res => res.json()))
}