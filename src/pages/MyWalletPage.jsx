import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { MdOutlinePageview } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { PiHandDepositBold } from "react-icons/pi";
import OverviewTab from "../components/wallet/OverviewTab";
import History from "../components/wallet/HistoryTab";
import HistoryTab from "../components/wallet/HistoryTab";
import WithdrawTab from "../components/wallet/WithdrawTab";
import DepositTab from "../components/wallet/DepositTab";



export default function MyWalletPage() {
    const [active, setActive] = useState('overview');
    const bookings = [];

    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="bottom-title">
                                <h2>My Wallet</h2>
                            </div>

                            <div className="rentals-sections">
                                <div className={`rentals-filters ${active === 'overview' ? "active" : ""}`}
                                    onClick={() => setActive("overview")}
                                >
                                    <MdOutlinePageview className="sidebar-icon" />
                                    <span>Overview</span>
                                </div>

                                <div className={`rentals-filters ${active === 'history' ? "active" : ""}`}
                                    onClick={() => setActive("history")}
                                >
                                    <MdOutlinePageview className="sidebar-icon" />
                                    <span>History</span>
                                </div>

                                <div className={`rentals-filters ${active === 'withdraw' ? "active" : ""}`}
                                    onClick={() => setActive("withdraw")}
                                >
                                    <PiHandWithdraw className="sidebar-icon" />
                                    <span>Withdraw</span>
                                </div>

                                <div className={`rentals-filters ${active === 'deposit' ? "active" : ""}`}
                                    onClick={() => setActive("deposit")}
                                >
                                    <PiHandDepositBold className="sidebar-icon" />
                                    <span>Deposit</span>
                                </div>
                            </div>

                            <div className="rentals-content">
                               {bookings.length > 0 || (
                                <div className="wallet-card">
                                    {active === "overview" && <OverviewTab />}
                                    {active === "history" && <HistoryTab/>}
                                    {active === "withdraw" && <WithdrawTab/>}
                                    {active === "deposit" && <DepositTab/>}
                                </div>
                                   
                               )}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </div>   
    );
}


