const API = "http://localhost:8080/rentals";

export async function getRentalsForUserById (userId) {
    const response = await fetch(`${API}/getRentalsForUserById/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to get rentals for user!")
    }

    const data = await response.json();
    return data;
}


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

export async function checkInRentalFromBackend(idRental) {
    const response = await fetch(`${API}/checkInRental/${idRental}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to check in rental!")
    }

    const data = await response.json();
    return data;
}

export async function checkOutRentalFromBackend(idRental) {
    const response = await fetch(`${API}/checkOutRental/${idRental}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to check out rental!");
    }

    const data = await response.json();
    return data;
}

export async function cancelRentalFromBackend(idRental) {
    const response = await fetch(`${API}/cancelRental/${idRental}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to cancel rental!");
    }

    const data = await response.json();
    return data;
}