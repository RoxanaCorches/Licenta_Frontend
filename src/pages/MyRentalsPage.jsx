import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { getRentalsForUserById } from "../services/backend/RentalService";
import { getUserById } from "../services/backend/UsersService";
import { useWallet } from "../hooks/WalletContext";

export default function MyRentalsPage() {
    const [active, setActive] = useState('upcoming');
    const [rentals, setRentals] = useState(null);

    const [completeFeedback, setCompleteFeedback] = useState(false);
    const [hoverStars, setHoverStars] = useState(0);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    
    const [loading, setLoading] = useState(false);
    const  [error, setError] = useState(null);

    const { account } = useWallet();
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

    //const idUser = localStorage.getItem("idUserConnected");  

    const rentalsStatus = rentals?.filter(rental => {
        if(active === "upcoming") return rental.status === "UPCOMING";
        if(active === "completed") return rental.status === "COMPLETED";
        if(active === "cancelled") return rental.status === "CANCELLED";
        return false;
    });

    
    useEffect(() => {
        const loadInfoRental = async () => {
             setRentals([]);
             setError(null);

            if (!account) 
                return; 
            try {
                setLoading(true);
                
                const dataUser = await getUserById(account);
                if (!dataUser || !dataUser.idUser) {
                setError("User not found for this wallet!");
                    return;
                }
                const idUser = dataUser.idUser;

                console.log("id user for rentals:", idUser);

                const data = await getRentalsForUserById(idUser);
                console.log("Data from rentals", data);
                
                const myRentals = data.filter(r => r.userId === idUser); 
                console.log("data.userId", myRentals);
                setRentals(myRentals);
                console.log("Info for rentals:", myRentals);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoRental();
    }, [account]);

    
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

    const handleCancelRental = () => {
        try{
            setLoading(true);
            
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
                                {rentalsStatus?.length > 0 ? (
                               <div className="apartmnets-container">
                                    {rentalsStatus?.map((rental, index) => (
                                        <div className="rental-card-wrapper" key={index}>
                                            <div className="rental-card">
                                                <div className="rental-image">
                                                    <img src={rental.imageMainUrl} alt={rental.title} />
                                                </div>   
                              
                                                <div className="rental-information">
                                                    <p className="rental-name">{rental.title} - {rental.city}, {rental.country}</p>
                                                       
                                                   
                                                    <div className="check"> 
                                                         <p>{new Date (rental.startDate).toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} - {new Date(rental.endDate).toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} </p>
                                                    </div>
                              
                                                    <div className="check"> 
                                                        <p>{rental.status} </p>
                                                    </div>
                                                </div>
                              
                                                <div className="rental-feedback">
                                                    <p className="rental-price">{rental.totalPrice} ETH</p>

                                                    { active === "upcoming" && (
                                                        <button 
                                                            className="button-review"
                                                            onClick={handleCancelRental}    
                                                        >
                                                            Cancel
                                                        </button>
                                                    ) }
                                                    
                                                    { active === "completed" && 
                                                        (
                                                            <button 
                                                                className="button-review"
                                                                onClick={handleReview}    
                                                            >
                                                                Review
                                                            </button>
                                                        ) 
                                                    }
                                                </div>  
                                            </div>
                                    </div>
                                ))}
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


