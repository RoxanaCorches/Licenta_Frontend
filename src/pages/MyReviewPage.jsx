import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";

export default function MyReviewPage() {
    const [active, setActive] = useState('upcoming');
    const bookings = [1];

    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="bottom-title">
                                <h2>My rentals</h2>
                            </div>

                            <div className="rentals-sections">
                                <div className={`rentals-filters ${active === 'upcoming' ? "active" : ""}`}
                                    onClick={() => setActive("upcoming")}
                                >
                                    <FaCheckCircle className="sidebar-icon" />
                                    <span>Upcoming</span>
                                </div>

                                <div className={`rentals-filters ${active === 'completed' ? "active" : ""}`}
                                    onClick={() => setActive("completed")}
                                >
                                    <FaCheckCircle className="sidebar-icon" />
                                    <span>Completed</span>
                                </div>

                                <div className={`rentals-filters ${active === 'cancelled' ? "active" : ""}`}
                                    onClick={() => setActive("cancelled")}
                                >
                                    <TbCancel className="sidebar-icon" />
                                    <span>Cancelled</span>
                                </div>
                            </div>

                            <div className="rentals-content">
                               {bookings.length > 0 ? (
                                <div className="rental-card">
                                    <div className="rental-image">
                                        <img src="src\assets\imgg.jpg" alt="No rentals" />
                                    </div>   

                                    <div className="rental-information">
                                        <p className="rental-name">Nume booking</p>
                                        <p>City</p>
                                        <p>Date checkIn - Date checkOut</p>
                                        <p>Status</p>
                                    </div>

                                    <div className="rental-price">
                                        <p> 234$</p>
                                    </div>
                                </div>
                                   
                               ) : (
                                <div className="no-rentals">
                                    <img src="src\assets\suitcase.png" alt="No rentals" />
                                    <p>No rentals found.</p>

                                </div>    
                               )
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </div>   
    );
}


