import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWallet, FaBuildingCircleArrowRight } from "react-icons/fa6";
import "../pages/Navbar.css";

export default function Navbar() {
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
                        <NavLink 
                            to="/connect-wallet" 
                            className={({ isActive }) => 
                                `navbar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FaWallet  className="navbar-icon" />
                            <span>Connect Wallet</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}