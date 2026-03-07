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

export default function Navbar() {
    const {account, connectWallet} = useWallet();
    const [panelInfo, setPanelInfo] =useState(false);

    const walletAddress = account || localStorage.getItem("walletAddress");
    console.log("Wallet from kyc:", walletAddress);

    const dropdownPanel = (e) => {
        e.preventDefault();
        setPanelInfo(!panelInfo);
    };

    const logout = () => {
        localStorage.removeItem("walletAddress");
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-brand">
                    <FaHome />
                    <span>Booking</span>
                </NavLink>
                
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        {walletAddress ? (
                        <NavLink 
                            to="/listYourProperty" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaHome className="navbar-icon" />
                            <span>List your property</span>
                        </NavLink>
                        ) : (<NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaHome className="navbar-icon" />
                            <span>Home</span>
                        </NavLink>
                    )}
                    </li>

                    <li className="navbar-item">
                        <NavLink 
                            to="/properties" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaBuildingCircleArrowRight  className="navbar-icon" />
                            <span>Properties</span>
                        </NavLink>
                    </li>

                    <li className="navbar-item">
                            {walletAddress ? (
                                <div className="container-wrapper-info"> 
                                <div className="navbar-container-info"> 
                                    <span onClick = {dropdownPanel} className="navbar-button">Your account: {walletAddress &&  `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
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
                                <FaWallet  className="navbar-icon" />
                            <span>Connect Wallet</span></button>
                        )}
                       
                    </li>
                </ul>
            </div>
        </nav>
    );
}