import { useState } from "react";
import { WalletContext } from "../hooks/WalletContext";
import { hasKycNft } from "../services/KycNftService";

export function ConnectWallet({children}){
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");

    const connectWallet = async () => {
        if(!window.ethereum){
            setError("You must install MetaMask!");
            return;
        }

        try{
         const accounts = await window.ethereum.request({
            method: "eth_requestAccounts", });  
            console.log("Accounts:", accounts);

            const walletAddress = accounts[0];

            console.log("Address wallet connected:",walletAddress);
            setAccount(walletAddress);
            
            setError(""); 
            localStorage.setItem("walletAddress", walletAddress);
            await hasKycNft(walletAddress);
        }catch(err){
            setError(err.message);
        }
    }
    return (
        <WalletContext.Provider value={{account, connectWallet, error}}>
            {children}
        </WalletContext.Provider>
  );
}

