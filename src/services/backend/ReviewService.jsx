const API = "http://localhost:8080/reviews";

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


