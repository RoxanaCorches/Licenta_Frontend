import Sidebar from "../components/listProperty/SideBar";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import { BiSolidDownload } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProviderAndSigner } from "../services/blockchain/WalletService";
import { useWallet } from "../hooks/WalletContext";
import { getUserById } from "../services/backend/UsersService";
import { getRentalsForUserById } from "../services/backend/RentalService";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";


export default function MyWalletPage() {
const [panelDeposit, setPanelDeposit] = useState(false);
const [deposit, setDeposit] = useState("");

const [panelWithdraw, setPanelWithdraw] = useState(false);
const [withdraw, setWithdraw] = useState("");
const [walletAddress, setWalletAddress] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const myWalletAddress = localStorage.getItem("walletAddress");
const [copyWalletAddress, setCopyWalletAddress] = useState(false);

const [balance, setBalance] = useState("0.0");

 const [nrTransactions, setNrTransactions] = useState(5);

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


    const handleCopyAddress = () => {
        navigator.clipboard.writeText(myWalletAddress);
        setCopyWalletAddress(true);

        setTimeout(() => {
            setCopyWalletAddress(false);
        }, 1000);
    }

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


     
    const [rentals, setRentals] = useState(null);
    const { account } = useWallet();
    /*
        useEffect(() => {
                const loadInfoUser = async () => {
                    try {
                        setLoading(true);
                        const data = await getUserById(idUser);
                        setUser(data);
                        console.log("Info:", data);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setLoading(false);
                    }
                };
                loadInfoUser();
            }, [idUser]);
        */
    
        //const idUser = localStorage.getItem("idUserConnected");  
        
        useEffect(() => {
            const loadInfoRental = async () => {
                 setRentals([]);
                 setError(null);
    
                if (!account) 
                    return; 
                try {
                    setLoading(true);
                    
                    const dataUser = await getUserById(account);
                    if (!dataUser || !dataUser.idUser) {
                    setError("User not found for this wallet!");
                        return;
                    }
                    const idUser = dataUser.idUser;
    
                    console.log("id user for rentals:", idUser);
    
                    const data = await getRentalsForUserById(idUser);
                    console.log("Data from rentals", data);
                    
                    const myRentals = data.filter(r => r.userId === idUser); 
                    console.log("data.userId", myRentals);
                    setRentals(myRentals);
                    console.log("Info for rentals:", myRentals);
                    
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            loadInfoRental();
        }, [account]);

    if (error) 
        return (
            <div className="error-info">
                <IoMdWarning className="icon-error"/> 
                <p className="description-error">{error}!</p>
            </div>
    );

    if(loading) {
        return(
            <div className="spinner">
                <ClipLoader loading={loading} size={40} />
            </div>
        );
    };

    return (
        <div>
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

                                    <button 
                                        className="button-copy"
                                        onClick={handleCopyAddress}
                                    >
                                        {copyWalletAddress ? (<FaCheck  className="icon"/>)
                                        : (
                                              <IoCopy className="icon"/>
                                        )}
                                    </button>
                                </div>
                            </div>


                        <div className="container-transaction-history">
                            <p className="title"> Transaction History</p>
                            
                            <div className="container-status-transactions">
                                {rentals?.length > 0 ? (
                                    <div className="apartmnets-container">
                                        {rentals?.slice(0, nrTransactions).map((rental, index) => (
                                            <div 
                                                className={`transaction-item ${index === Math.min(nrTransactions, rentals.length) - 1 ? "last" : ""}`} 
                                                key={rental.idRental}
                                            >

                                                <div className="status-date">
                                                    {(rental.status === "UPCOMING"  || rental.status === "COMPLETED") &&
                                                        <div className="icon-status">
                                                            <FiSend className="icon"/>
                                                        </div>
                                                    }

                                                    {rental.status === "CANCELLED" &&
                                                        <div className="icon-status ">
                                                            <BiSolidDownload className="icon-refund"/>
                                                        </div>
                                                    }

                                                    {(rental.status === "UPCOMING"  || rental.status === "COMPLETED")  &&
                                                        <div className="name-hotel-date">
                                                            <p className="name-hotel">Payment for booking - {rental.title}</p>
                                                            <p className="date-pay">{new Date(rental.rentalDate).toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})}</p>
                                                        </div>
                                                    }

                                                    {rental.status === "CANCELLED" &&
                                                        <div className="name-hotel-date">
                                                            <p className="name-hotel">Refund - Cancelled booking - {rental.title}</p>
                                                            <p className="date-pay">{new Date(rental.rentalDate).toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})}</p>
                                                        </div>
                                                    }
                                                </div>
                                                

                                                
                                                 <div className="status-date">
                                                     {(rental.status === "UPCOMING"  || rental.status === "COMPLETED") &&
                                                        <div className="name-hotel-date">
                                                            <div className="price-for-rental">
                                                                <p className="price-payment"> - {rental.totalPrice}</p>
                                                                <p>ETH</p>
                                                            </div>
                                                            <p className="status">{rental.status.charAt(0).toUpperCase() 
                                                            +  rental.status.slice(1).toLowerCase()}</p>
                                                        </div>
                                                    }

                                                    {rental.status === "CANCELLED" &&
                                                        <div className="price-for-rental">
                                                            <p className="price-refund"> + {(90 * rental.totalPrice) / 100}</p>
                                                            <p>ETH</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        ))}

                                        <div className="button-load-results">
                                            {nrTransactions < rentals?.length ? (
                                                <button
                                                    className="button-load-more"
                                                    onClick={() => setNrTransactions(prev => prev + 3)}
                                                >
                                                    View more transactions
                                                </button>
                                            ) : (
                                                <p>End of transactions list.</p>
                                            )}
                                        </div>
                                    </div>
                                    ) : (
                                        <div className="no-reviews">
                                            <img src="src\assets\transactions.png" alt="No rentals" />
                                            <p>No transactions found.</p>
                                        </div>    
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
     </div> 
    );
}


