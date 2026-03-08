import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";

export default function MyListingsPage() {
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
                                <h2>My listings</h2>
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


