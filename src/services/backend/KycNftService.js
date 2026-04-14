const API = "http://localhost:8080/kycNft";

export async function hasKycNft(walletAddress) {
    const response = await fetch(`${API}/kyc/status?walletAddress=${walletAddress}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error("Error to ckeck kyc status!")
    }
    
    const data = await response.json();
    if(data.hasKycNft) {
        window.location.href = "/properties";
    } else {
        window.location.href = "/kyc";
    }
}