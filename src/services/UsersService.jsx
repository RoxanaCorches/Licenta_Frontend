const API = "http://localhost:8080/users";

export async function createUser(addUser) {
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
    
    const username = data.username;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const birthday = data.birthday;
    const phoneNumber = data.phoneNumber;
    const nationality = data.nationality;
    const city = data.city;
    const address = data.address;
    const zipcode = data.zipcode;
    const walletAddress = data.walletAddress;


    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("birthday", birthday);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("nationality", nationality);
    localStorage.setItem("city", city);
    localStorage.setItem("address", address);
    localStorage.setItem("zipcode", zipcode);
    localStorage.setItem("walletAddress", walletAddress);

    return {username, firstName, lastName, birthday, phoneNumber, nationality, city, address, zipcode, walletAddress};
}