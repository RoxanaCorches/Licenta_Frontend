import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";

export default function MyReviewPage() {
    const [active, setActive] = useState('received');
    const bookings = [1];

    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="title-review">
                                <h2>Reviews</h2>
                            </div>

                            <div className="reviews-sections">
                                <div className={`reviews-filters ${active === 'received' ? "active" : ""}`}
                                    onClick={() => setActive("received")}
                                >
                                    <span>Reviews Received (nr)</span>
                                </div>

                                <div className={`reviews-filters ${active === 'given' ? "active" : ""}`}
                                    onClick={() => setActive("given")}
                                >
                                    
                                    <span>Review Given</span>
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


