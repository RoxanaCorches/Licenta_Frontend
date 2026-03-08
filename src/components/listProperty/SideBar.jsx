import { NavLink } from "react-router-dom";
import { FaUser, FaSuitcase } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";

export default function Sidebar() {
    return(
                <div className="sidebar">
                    <NavLink to="/myAccount" className="sidebar-link-option">
                        <FaUser className="sidebar-icon" />
                        <span>My Account</span>
                    </NavLink>

                    <NavLink to="/myRentals" className="sidebar-link-option">
                        <FaSuitcase className="sidebar-icon" />
                        <span>My Rentals</span>
                    </NavLink>

                     <NavLink to="/myListings" className="sidebar-link-option">
                        <FaClipboardList className="sidebar-icon" />
                        <span>My Listings</span>
                    </NavLink>

                    <NavLink to="/myWallet" className="sidebar-link-option">
                        <FaSuitcase className="sidebar-icon" />
                        <span>Wallet</span>
                    </NavLink>

                    <NavLink to="/settings" className="sidebar-link-option">
                        <IoMdSettings className="sidebar-icon" />
                        <span>Settings</span>
                    </NavLink>

                    <NavLink to="/" className="sidebar-link-option">
                        <RiLogoutCircleRFill className="sidebar-icon" />
                        <span>Logout</span>
                    </NavLink>
                </div>
    );
}