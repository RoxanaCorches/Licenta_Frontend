import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import {cancelRentalFromBackend, getRentalsForUserById } from "../services/backend/RentalService";
import { getUserById } from "../services/backend/UsersService";
import { useWallet } from "../hooks/WalletContext";
import { cancelRental } from "../services/blockchain/MarketplaceService";
import { createReview } from "../services/backend/ReviewService";

export default function MyRentalsPage() {
    const [active, setActive] = useState('upcoming');
    const [rentals, setRentals] = useState(null);
    const [nrRentals, setNrRentals] = useState(3);

    const [selectedRental, setSelectedRental] = useState(false);
    const [completeFeedback, setCompleteFeedback] = useState(false);
    const [hoverStars, setHoverStars] = useState(0);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    /*
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
    */
    const handleReview = async (apartment) => {
        setSelectedRental(apartment);
        setCompleteFeedback(true);
    }

    const submitReview = async () => {
            if (!selectedRental) return;
            //console.log("Create review for apartment:", apartment);
           // const {rentalId, userId } = apartment;
            //console.log("Id ul rezervarii pt care se lasa review", rentalId);
           // console.log("Id ul user ului care lasa review", userId);
/*
            if (!rentalId || !userId) {
                console.error("Invalid apartment info!", apartment);
                return;
            } 
            console.log("Create review for rental, user:", rentalId, userId );
*/
            try{
                setLoading(true);
                const addReviewInfo = {
                    idUser: selectedRental.userId,
                    idRental: selectedRental.rentalId,
                    comment: feedback,
                    date: new Date(),
                    rating:rating,
                }

                console.log(addReviewInfo);
       
                console.log(selectedRental)
                await createReview(addReviewInfo);

                alert("Review posted!")
                setCompleteFeedback(false);
                setRating(1);
                setHoverStars(1);
            }catch(err){
                console.log(err);
                setError(err.message);
            } finally {
            setLoading(false);
        }
    }

    const handleCancelRental =  async (apartment) => {
        console.log("Cancel rantal for apartment:", apartment);

        const {apartmentId, tokenId, rentalId } = apartment;

        console.log("IdRental:", rentalId);
        console.log("apartmentId", apartmentId);
        console.log("tokenId", tokenId );
    
        if (!rentalId || !tokenId) {
            console.error("Invalid apartment info!", apartment);
            return;
        } 
        console.log("Cancel reantal for rental:", rentalId, tokenId );
    
        try{
            await cancelRental(tokenId);
            console.log("Cancel rental from marketplace");
            await cancelRentalFromBackend(rentalId);
    
            //console.log("Delete form database");
                  
            setRentals(prev => 
                prev.map(rental => rental.rentalId === rentalId 
                    ? {...rental, status:"CANCELLED" } : rental 
                )
            );

            setActive("cancelled");
            alert("Rental cancelled!")
            } catch(err){
                 console.log(err);
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

                            <div className="reviews-sections">
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
                               <div className="apartments-container">
                                    {rentalsStatus?.slice(0, nrRentals).map((rental) => (
                                        <div className="rental-card-wrapper" key={rental.rentalId}>
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
                                                            onClick={() => handleCancelRental(rental)}>
                                                        
                                                            Cancel
                                                        </button>
                                                    ) }
                                                    
                                                    { active === "completed" && 
                                                        (
                                                            <button 
                                                                className="button-review"
                                                                onClick={() => handleReview(rental)}
                                                                disabled={loading}
                                                            >   
                                                                Review
                                                            </button>
                                                        ) 
                                                    }
                                                </div>  
                                            </div>
                                    </div>
                                ))}

                                <div className="button-load-results">
                                    {nrRentals < rentalsStatus.length ? (
                                        <button
                                            className="button-load-more"
                                            onClick={() => setNrRentals(prev => prev + 3)}
                                        >
                                            View more results
                                        </button>
                                    ) :(
                                        
                                        <p>End of rentals list</p>
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
                                            onClick={submitReview} 
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


