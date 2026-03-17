import { ethers } from "ethers";

export const getProviderAndSigner = async () => {
    if(!window.ethereum) throw new Error("MetaMask must be install!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return{ provider, signer};
}