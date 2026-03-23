const API = "http://localhost:8080/rentals";

export async function createRental(addARenatalInfo) {
    const response = await fetch(`${API}/createRental`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(addARenatalInfo),
    });

    if(!response.ok) {
        throw new Error("Error to create rental!")
    }

    const data = await response.json();
    return data;
}