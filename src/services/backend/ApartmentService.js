const API = "http://localhost:8080/apartments";

export async function getAllApartments() {
    const response = await fetch(`${API}/getAllApartments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to get apartments!")
    }

    const data = await response.json();
    return data;
}

export async function getFilteredApartments(location, checkIn, checkOut, guests, rooms) {
    const response = await fetch(`${API}/getFilteredApartments?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&rooms=${rooms}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to filter apartments!")
    }

    const data = await response.json();
    return data;
}


export async function getApartmentById(apartmentId) {
    const response = await fetch(`${API}/getApartmentById/${apartmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to get apartment!")
    }

    const data = await response.json();
    return data;
}

export async function createApartment(addApartment, images) {
    const info = new FormData();

    info.append("information", new Blob([JSON.stringify(addApartment)], {type: "application/json"}));
    images.forEach(img => {
        info.append("images", img);
    });
    const response = await fetch(`${API}/createApartment`, {
        method: "POST",
        body: info,
    });

    if(!response.ok) {
        throw new Error("Error to create apartment!")
    }

    const data = await response.json();
    return data;
}

export async function updatePriceApartment(idApartment, updateApartment) {
    const response = await fetch(`${API}/updateApartment/${idApartment}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(updateApartment),
    });

    if(!response.ok) {
        throw new Error("Error to update apartment!")
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    return data;
}


export async function deleteApartment(apartmentId) {
    const response = await fetch(`${API}/deleteApartment/${apartmentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to delete apartment!")
    }
}
