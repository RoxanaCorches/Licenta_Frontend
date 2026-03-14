import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { FaStar } from "react-icons/fa";

export default function MyRentalsPage() {
    const [active, setActive] = useState('upcoming');
    const bookings = [1];

    const [completeFeedback, setCompleteFeedback] = useState(false);
    const [hoverStars, setHoverStars] = useState(0);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    
    const [loading, setLoading] = useState(false);
    const  [error, setError] = useState(null);
/*
    useEffect(() => {
            const loadInfoUser = async () => {
                try {
                    setLoading(true);
                    const data = await getUserById(idUser);
                    setUser(data);
                    console.log("Info:", data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            loadInfoUser();
        }, [idUser]);
    */
    
    const handleFeedback = () => {
        try{
            setLoading(true);
            setCompleteFeedback(false);
            setFeedback("");
            setHoverStars(1);
            setRating(1);
        }catch(error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    };

    const handleReview = () => {
        try{
            setLoading(true);
            setCompleteFeedback(true);
            console.log("Da");
        }catch(error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    };
     
     if(error){
        return <div>{error}</div>
    }

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

                                    <div className="rental-feedback">
                                        <p className="rental-price">234$</p>
                                        {active === "completed" && (
                                            <button 
                                                className="button-review"
                                                onClick={handleReview}    
                                            >
                                                Review
                                            </button>
                                        )}
                                    </div>  
                                </div>
                                   
                               ) : (
                                <div className="no-rentals">
                                    <img src="src\assets\suitcase.png" alt="No rentals" />
                                    <p>No rentals found.</p>

                                </div>    
                               )}
                            </div>
                        </div>

                        {completeFeedback && (
                            <div className="edit-container">
                                <div className="modal-edit">
                                    <h2>How was your experience?</h2>
                                    <div className="container-stars">
                                        {[1,2,3,4,5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${(hoverStars || rating) >= star ? "active" : ""}`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverStars(star)}
                                            onMouseLeave={() => setHoverStars(0)}
                                        >
                                        <FaStar />
                                        </span>
                                        ))}
                                    </div>

                                    <textarea
                                        className="input-feedback"
                                        value={feedback}
                                        placeholder="Tell us about your experience!"
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />

                                    <div className="modal-edit-buttons">
                                        <button 
                                            className="cancel" 
                                            onClick={
                                                () => {setCompleteFeedback(false)
                                                    setHoverStars(1);
                                                    setRating(1);
                                                }
                                            }
                                            
                                        >
                                            Cancel
                                        </button>

                                        <button  
                                            className="submit" 
                                            onClick={handleFeedback} 
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )} 
                    </div>
                </div>
            </div>  
        </div> 
    );
}


