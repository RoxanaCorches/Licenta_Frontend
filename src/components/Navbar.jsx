import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWallet, FaBuildingCircleArrowRight } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import "../pages/Navbar.css";
import { useWallet } from "../hooks/WalletContext";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";

export default function Navbar() {
    const { account, connectWallet, disconnectWallet } = useWallet();
    const [panelInfo, setPanelInfo] = useState(false);

    //const walletAddress = account || localStorage.getItem("walletAddress");
    const walletAddress = account;
    console.log("Wallet from kyc:", walletAddress);

    const dropdownPanel = (e) => {
        e.preventDefault();
        setPanelInfo(!panelInfo);
    };

    
    const logout = () => {
    disconnectWallet();
    localStorage.setItem("walletDisconnected", true);
    //localStorage.clear();
    localStorage.removeItem("userId");
    //localStorage.removeItem("walletAddress");
    sessionStorage.clear();
    window.location.replace("/");
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink to="/" className = {({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                        }>
                            <FaHome className="navbar-icon"/>
                            <span>Booking</span>
                        </NavLink>
                    </li>

                     <li className="navbar-item">
                        {walletAddress ? (
                        <NavLink 
                            to="/listYourProperty" 
                            className = {({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaHome className="navbar-icon"/>
                            <span>List your property</span>
                        </NavLink>
                        ) : (<NavLink 
                            to="/about" 
                            className = {({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaHome className="navbar-icon" />
                            <span>About</span>
                        </NavLink>
                    )}
                    </li>

                    <li className="navbar-item">
                        <NavLink 
                            to="/properties" 
                            className = {({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaBuildingCircleArrowRight  className="navbar-icon" />
                            <span>Properties</span>
                        </NavLink>
                    </li>

                    <li className="navbar-item">
                        <NavLink 
                            to="/support" 
                            className = {({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <LuMessageCircle   className="navbar-icon" />
                            <span>Support</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-brand">
                            {walletAddress ? (
                                <div className="container-wrapper-info"> 
                                <div className="navbar-container-info"> 
                                    <span onClick = {dropdownPanel} className="navbar-button-active">
                                        <IoWalletOutline className="navbar-icon" />
                                        Your account: {walletAddress &&  `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
                                </div>

                                {panelInfo && (
                                    <div className="search-panel-info">
                                        <NavLink to="/myAccount" className="navbar-link-option">
                                            <FaUser className="navbar-icon"/>
                                            <span>My Account</span>
                                        </NavLink>    

                                        <NavLink to="/myRentals" className="navbar-link-option">
                                            <FaSuitcase className="navbar-icon" />
                                            <span>My Rentals</span>
                                        </NavLink>

                                        <NavLink to="/myListings" className="navbar-link-option">
                                            <FaClipboardList className="navbar-icon" />
                                            <span>My Listings</span>
                                        </NavLink>

                                        <NavLink to="/myWallet" className="navbar-link-option">
                                            <IoWallet className="navbar-icon" />
                                            <span>Wallet</span>
                                        </NavLink>

                                        <NavLink to="/myReviews" className="navbar-link-option">
                                            <MdRateReview className="navbar-icon" />
                                            <span>Reviews</span>
                                        </NavLink>

                                        <NavLink to="/settings" className="navbar-link-option">
                                            <IoMdSettings className="navbar-icon" />
                                            <span>Settings</span>
                                        </NavLink>
                                            
                                        <NavLink 
                                            to="/" 
                                            className="navbar-link-option"
                                            onClick={logout}
                                        >
                                            <RiLogoutCircleRFill className="navbar-icon"/>
                                            <span>Logout</span>
                                        </NavLink>  
                                    </div>    
                                )}
                                </div>
                        ) : (<button type="button"
                            onClick={connectWallet} 
                            className="navbar-button">
                                <IoWalletOutline className="navbar-icon" />
                            <span>Connect Wallet</span></button>
                        )}
                       
                    </div>
            </div>
        </nav>
    );
}