import { useState } from "react";
import { WalletContext } from "../hooks/WalletContext";
import { hasKycNft } from "../services/backend/KycNftService";

export function ConnectWallet({children}){
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");
   
    const connectWallet = async () => {
        if(!window.ethereum){
            setError("You must install MetaMask!");
            return;
        }
        try{
            const accounts = await window.ethereum.request({method: "eth_requestAccounts" });  
            console.log("Accounts:", accounts);
            const walletAddress = accounts[0];
           
            console.log("Address wallet connected:",walletAddress);
            setAccount(walletAddress);
            localStorage.setItem("walletAddress", walletAddress);

            setError(""); 

            await hasKycNft(walletAddress);
        }catch(err){
            setError(err.message);
        }
    };

    return (
        <WalletContext.Provider value={{account, connectWallet, error}}>
            {children}
        </WalletContext.Provider>
  );
}


/*
import { useState } from "react";
import { WalletContext } from "../hooks/WalletContext";
import { hasKycNft } from "../services/backend/KycNftService";
import { ethers } from "ethers";

export function ConnectWallet({children}){
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [error, setError] = useState("");
   
    const connectWallet = async () => {
        if(!window.ethereum){
            setError("You must install MetaMask!");
            return;
        }
        try{
            const accounts = await window.ethereum.request({method: "eth_requestAccounts", });  
            console.log("Accounts:", accounts);
            const walletAddress = accounts[0];
           
            console.log("Address wallet connected:",walletAddress);
            setAccount(walletAddress);
            localStorage.setItem("walletAddress", walletAddress);

            //provider pt a citi datele de pe blockchain
            const providerBlockchain = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(providerBlockchain);
            
            //signer pt a semna tranzactii
            const signerTransaction = providerBlockchain.getSigner();
            setSigner(signerTransaction);

            setError(""); 

            await hasKycNft(walletAddress);
        }catch(err){
            setError(err.message);
        }
    };

    return (
        <WalletContext.Provider value={{account, connectWallet, error, provider, signer}}>
            {children}
        </WalletContext.Provider>
  );
}
*/