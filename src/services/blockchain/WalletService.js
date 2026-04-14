import { ethers } from "ethers";

export const getProviderAndSigner = async () => {

    if(!window.ethereum) throw new Error("You must install MetaMask!");
    //provider pt a citi datele de pe blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    //signer pt a semna tranzactii
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    const balanceWei = await provider.getBalance(address);
    const balance = ethers.utils.formatEther(balanceWei);
    console.log("Balance:", balance);

    return{ provider, signer, balance};
}