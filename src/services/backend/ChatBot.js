const API = "http://localhost:8080/support";

export async function sendMessage(message) {
    const response = await fetch(`${API}/chatBot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            message:message,
    }),
    });

    if(!response.ok) {
        throw new Error("Error for chat bot!")
    }

    const data = await response.json();
    return data;
}