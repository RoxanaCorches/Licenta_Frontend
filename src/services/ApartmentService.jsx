const API = "http://localhost:8080/apartments";

export async function createApartment(addApartment) {
    const response = await fetch(`${API}/createApartment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(addApartment),
    });

    if(!response.ok) {
        throw new Error("Error to create apartment!")
    }

    const data = await response.json();
    return data;
}