export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
      res.json()
    );
  };
  
  export const createUser = (user) => {
    return fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  };
  
  export const getUserById = (currentUserId) => {
    return fetch(`http://localhost:8088/employees?id=${currentUserId}`).then(
      (res) => res.json()
    );
  };
  