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

export const getHikePlanById = (id) => {
  return fetch(`http://localhost:8088/hikePlans/${id}?_embed=features`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
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