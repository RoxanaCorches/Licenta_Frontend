import { useState } from "react";
import { WalletContext } from "../hooks/WalletContext";

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
            setAccount(accounts[0]);
            console.log(account[0]);
            setError(""); 
        
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

