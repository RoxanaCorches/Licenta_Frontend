import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getProviderAndSigner } from "../services/blockchain/WalletService";


export default function MyWalletPage() {
const [panelDeposit, setPanelDeposit] = useState(false);
const [deposit, setDeposit] = useState("");

const [panelWithdraw, setPanelWithdraw] = useState(false);
const [withdraw, setWithdraw] = useState("");
const [walletAddress, setWalletAddress] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const myWalletAddress = localStorage.getItem("walletAddress");

const [balance, setBalance] = useState("0.0");

const handleSubmitDeposit = () => {
     try{
        setLoading(true);
        setPanelDeposit(false);
        setDeposit("");
    }catch(error) {
        setError(error.message);
    }finally {
        setLoading(false);
    }
};

const handleSubmitWithdraw = () => {
     try{
        setLoading(true);
        setPanelWithdraw(false);
        setWithdraw("");
        setWalletAddress("");
    }catch(error) {
        setError(error.message);
    }finally {
        setLoading(false);
    }
};

     const handleDeposit = () => {
        try{
            setLoading(true);
            setPanelDeposit(true);
        }catch(error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    };

    const handleWithdraw = () => {
        try{
            setLoading(true);
            setPanelWithdraw(true);
        }catch(error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function getBalance() {
            try{
                setLoading(true);
                const {balance} = await getProviderAndSigner();
                const balanceFloat =  parseFloat(balance).toFixed(4);
                console.log("balance:", balanceFloat);
                setBalance(balanceFloat);
            }catch(error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        }
        getBalance();
    }, []);

      if(error){
        return <div>{error}</div>
    }

    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="bottom-title">
                                <h2> Wallet</h2>
                            </div>

                            <div className="available-balance">
                                <p>Available Balance</p>
                                <p className="balance">{balance} ETH</p>
                                <div className="buttons-balance">
                                    <button 
                                        className="deposit-withdraw"
                                        onClick={handleDeposit}
                                    >
                                        <MdOutlineFileDownload className="icon"/>
                                        <p>Deposit</p>
                                    </button>

                                    <button 
                                        className="deposit-withdraw"
                                        onClick={handleWithdraw}
                                    >
                                        <FiSend  className="icon"/>
                                        <p>Withdraw</p>
                                    </button>
                                </div>
                            </div>

                            {panelDeposit &&
                                 <div className="edit-container">
                                    <div className="modal-edit">
                                         <h2>Deposit to Wallet</h2>

                                    <div className="container-deposit-withdraw">
                                        <label>Amount (ETH)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={deposit}
                                        placeholder="0.00"
                                        onChange={(e) => setDeposit(e.target.value)}
                                    />
                                    <p>Send ETH to your wallet address to deposit funds</p>
                                    </div>
                                    
                                
                                    <div className="modal-edit-buttons">
                                        <button 
                                            className="cancel" 
                                            onClick={
                                            () => {setPanelDeposit(false)}
                                            }
                                        >
                                        Cancel
                                        </button>
                                                                       
                                         <button  
                                            className="submit" 
                                            onClick={handleSubmitDeposit} 
                                            disabled={loading}
                                        >
                                        {loading ? '...' : 'Proceed'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                        {panelWithdraw &&
                                 <div className="edit-container">
                                    <div className="modal-edit">
                                         <h2>Withdraw from Wallet</h2>

                                    <div className="container-deposit-withdraw">
                                        <label>Amount (ETH)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={withdraw}
                                        placeholder="0.00"
                                        onChange={(e) => setWithdraw(e.target.value)}
                                    />
                                    </div>

                                    <div className="container-deposit-withdraw">
                                        <label>Recipient Address</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={walletAddress}
                                        placeholder="0x..."
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                    />
                                    </div>
                                    
                                
                                    <div className="modal-edit-buttons">
                                        <button 
                                            className="cancel" 
                                            onClick={
                                            () => {setPanelWithdraw(false)}
                                            }
                                        >
                                        Cancel
                                        </button>
                                                                       
                                         <button  
                                            className="submit" 
                                            onClick={handleSubmitWithdraw} 
                                            disabled={loading}
                                        >
                                        {loading ? 'Withdrawing...' : 'Withdraw'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="container-walletAddress">
                                <p className="title"> Wallet Address</p>
                                
                                <div className="container-copy-address">
                                    <p className="address">{myWalletAddress}</p>

                                    <button className="button-copy">
                                        <IoCopy className="icon"/>
                                       
                                    </button>
                                </div>
                            </div>


                        <div className="container-transaction-history">
                                <p className="title"> Transaction History</p>
                                
                                <div className="container-status-transactions">
                                    <div className="status-date">
                                        <div className="icon-status">
                                            <FiSend className="icon"/>
                                        </div>
                                        <div className="name-hotel-date">
                                            <p className="name-hotel">Payment for booking - Old Town Boutique Hotel</p>
                                            <p className="date-pay">Jan 15, 2024</p>
                                        </div>
                                        
                                    </div>
                                        <div>
                                            <p className="price">+2.4 ETH</p>
                                             <p className="price">Status</p>
                                        </div>
                                </div>

                                <div className="container-status-transactions">
                                    <div className="status-date">
                                        <div className="icon-status">
                                            <MdOutlineFileDownload className="icon-refund"/>
                                        </div>
                                        <div className="name-hotel-date">
                                            <p className="name-hotel">Refund - Cancelled booking</p>
                                            <p className="date-pay">Jan 15, 2024</p>
                                        </div>
                                        
                                    </div>
                                        <div>
                                            <p className="price">+2.4 ETH</p>
                                             <p className="price">Status</p>
                                        </div>
                                </div>

                                 <div className="container-status-transactions">
                                    <div className="status-date">
                                        <div className="icon-status">
                                            <FaArrowTrendDown className="icon-deposit"/>
                                        </div>
                                        <div className="name-hotel-date">
                                            <p className="name-hotel">Deposit from external wallet</p>
                                            <p className="date-pay">Jan 15, 2024</p>
                                        </div>
                                        
                                    </div>
                                        <div>
                                            <p className="price">+2.4 ETH</p>
                                             <p className="price">Status</p>
                                        </div>
                                </div>

                                <div className="container-status-transactions">
                                    <div className="status-date">
                                        <div className="icon-status">
                                            <FaArrowTrendUp className="icon-withdraw"/>
                                        </div>
                                        <div className="name-hotel-date">
                                            <p className="name-hotel">Withdrawal to external wallet</p>
                                            <p className="date-pay">Jan 15, 2024</p>
                                        </div>
                                        
                                    </div>
                                        <div>
                                            <p className="price">+2.4 ETH</p>
                                             <p className="price">Status</p>
                                        </div>
                                </div>


                                
                            </div>


                            
                        </div>
                    </div>
                </div>
            </div>
     </div>   
    );
}


