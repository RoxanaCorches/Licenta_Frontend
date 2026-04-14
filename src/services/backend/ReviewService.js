const API = "http://localhost:8080/reviews";

export async function getReviewsForApartment(idApartment) {
    const response = await fetch(`${API}/getReviewForApartment/${idApartment}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to get review for apartment!")
    }

    const data = await response.json();
    return data;
}

export async function createReview(addReviewInfo) {
    const response = await fetch(`${API}/createReview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(addReviewInfo),
    });

    if(!response.ok) {
        throw new Error("Error to create review!")
    }

    const data = await response.json();
    return data;
}


