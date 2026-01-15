import { useState } from "react";
import { WalletContext } from "../hooks/WalletContext";

export function ConnectWallet({children}){
    const [account, setAccount] = useState(null);
    const [setError] = useState("");

    const connectWallet = async () => {
        if(!window.ethereum){
            setError("You must install MetaMask!");
            return;
        }

        try{
         const accounts = await window.ethereum.request({
            method: "eth_requestAccounts", });  
            setAccount(accounts[0]);
            setError(""); 
        
        }catch(err){
            setError(err);
        }
    }

    return (
        <WalletContext.Provider value={{account, connectWallet}}>
            {children}
        </WalletContext.Provider>
  );
}

