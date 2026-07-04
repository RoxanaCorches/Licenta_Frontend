import { useEffect, useState } from "react";
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
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});  
            console.log("Accounts:", accounts);
            const walletAddress = accounts[0];
           
            console.log("Address wallet connected:",walletAddress);
            setAccount(walletAddress);
            localStorage.setItem("walletAddress", walletAddress);
            localStorage.removeItem("walletDisconnected");

            setError(""); 

            await hasKycNft(walletAddress);
        }catch(err){
            setError(err.message);
        }
    };

    useEffect(() => {
        const verifyConnectWallet = async () => {
            if(!window.ethereum) return;

            const isDisconnectWllet = localStorage.getItem("walletDisconnected");

            if(isDisconnectWllet) return;

            const accounts = await window.ethereum.request({method: "eth_accounts"});  

            if(accounts.length > 0 )
                setAccount(accounts[0]);
        };
        verifyConnectWallet();
    }, [account]);

    const disconnectWallet = () => {
        setAccount(null);
        localStorage.removeItem("walletAddress");
    }

    return (
        <WalletContext.Provider value={{account, connectWallet, disconnectWallet, error}}>
            {children}
        </WalletContext.Provider>
  );
}
