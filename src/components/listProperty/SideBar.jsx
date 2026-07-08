import { NavLink } from "react-router-dom";
import { FaUser, FaSuitcase } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { useWallet } from "../../hooks/WalletContext";

export default function Sidebar() {

    const { disconnectWallet } = useWallet();
    
      const logout = () => {
        disconnectWallet();
        localStorage.setItem("walletDisconnected", true);
        localStorage.removeItem("userId");
        sessionStorage.clear();
        window.location.replace("/");
    };

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
                        <IoWallet className="sidebar-icon" />
                        <span>Wallet</span>
                    </NavLink>

                    <NavLink to="/myReviews" className="sidebar-link-option">
                        <MdRateReview className="sidebar-icon" />
                        <span>Reviews</span>
                    </NavLink>

                    <NavLink 
                        to="/" 
                        className="sidebar-link-option"
                        onClick={logout}
                    >
                        <RiLogoutCircleRFill className="sidebar-icon" />
                        <span>Logout</span>
                    </NavLink>

                </div>
    );
}