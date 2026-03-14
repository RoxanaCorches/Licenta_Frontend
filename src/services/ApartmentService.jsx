const API = "http://localhost:8080/apartments";

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