import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWallet, FaBuildingCircleArrowRight } from "react-icons/fa6";
import "../pages/Navbar.css";
import { useWallet } from "../hooks/WalletContext";

export default function Navbar() {
    const { connectWallet} = useWallet();
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-brand">
                    <FaHome />
                    <span>Booking</span>
                </NavLink>
                
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaHome className="navbar-icon" />
                            <span>Home</span>
                        </NavLink>
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
                        <button 
                            onClick={connectWallet} 
                            className="navbar-button"
                        >    
                            <FaWallet  className="navbar-icon" />
                            <span>Connect Wallet</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}