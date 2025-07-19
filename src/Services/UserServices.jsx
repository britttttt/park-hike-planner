export const getUserByEmail = (email) => {
    return fetch(`https://park-hike-planner.onrender.com/users?email=${email}`).then((res) =>
      res.json()
    );
  };
  
  export const createUser = (user) => {
    return fetch("https://park-hike-planner.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  };
  
  export const getUserById = (currentUserId) => {
    return fetch(`https://park-hike-planner.onrender.com/users?id=${currentUserId}`).then(
      (res) => res.json()
    )
  }
  