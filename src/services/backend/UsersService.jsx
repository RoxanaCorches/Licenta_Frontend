const API = "http://localhost:8080/users";

export async function getUserById(userId) {
    const response = await fetch(`${API}/getUserById/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to get user!")
    }

    const data = await response.json();
    return data;
}

export async function mintKycForUser(addUser) {
    const response = await fetch(`${API}/createUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(addUser),
    });

    if(!response.ok) {
        throw new Error("Error to create user!")
    }

    const data = await response.json();
    const userId = data.userId;
    const blockchainAddress = data.blockchainAddress;
    const birthday = data.birthday;
  

    localStorage.setItem("userId", userId);
    localStorage.setItem("blockchainAddress", blockchainAddress);
    localStorage.setItem("birthday", birthday);
    return data;
}


export async function updateUser(userId,updateUser) {
    const response = await fetch(`${API}/updateUser/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(updateUser),
    });

    if(!response.ok) {
        throw new Error("Error to update user!")
    }

    const data = await response.json();
    return data;
}



