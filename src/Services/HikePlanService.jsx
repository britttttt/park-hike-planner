export const getMonths = () => {
    return fetch(`https://park-hike-planner.onrender.com/months`).then((res) => res.json())
}


export const createHikePlan = (plan) => {
    return fetch(`https://park-hike-planner.onrender.com/hikePlans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
    }).then(res => res.json()) 
}

export const getHikePlanById = (id) => {
  return fetch(`https://park-hike-planner.onrender.com/hikePlans/${id}?_embed=features`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
}


export const saveHikePlan = (hikePlan) => {
    return fetch(`https://park-hike-planner.onrender.com/hikePlans/${hikePlan.id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hikePlan)
    }).then(res => res.json())
}

export const deleteHikePlan = (hikePlanId) => {
    return fetch(`https://park-hike-planner.onrender.com/hikePlans/${hikePlanId}`, {
        method: "DELETE"
    })
}


export const getHikePlansByUserId = (userId) => {
    return fetch (`https://park-hike-planner.onrender.com/hikePlans?userId=${userId}`)
    .then((res => res.json()))
}