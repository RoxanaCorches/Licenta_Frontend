import { useEffect, useState } from "react";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import {cancelRentalFromBackend, checkInRentalFromBackend, checkOutRentalFromBackend, getRentalsForUserById } from "../services/backend/RentalService";
import { getUserById } from "../services/backend/UsersService";
import { useWallet } from "../hooks/WalletContext";
import { cancelRental, checkInBlockchain, checkOutBlockchain } from "../services/blockchain/MarketplaceService";
import { createReview } from "../services/backend/ReviewService";
import { IoMdCloseCircle } from "react-icons/io";
import { FaLockOpen } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";
import { CgNametag } from "react-icons/cg";
import { RentalContext } from "../hooks/RentalContext";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuHourglass } from "react-icons/lu";

export default function MyRentalsPage() {
    const [active, setActive] = useState('upcoming');
    const [rentals, setRentals] = useState(null);
    const [nrRentals, setNrRentals] = useState(3);

    const [selectedRental, setSelectedRental] = useState(false);
    const [completeFeedback, setCompleteFeedback] = useState(false);
    const [hoverStars, setHoverStars] = useState(0);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");

    //const [reviewedRentals, setReviewedRentals] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorCheckIn, setErrorCheckIn] = useState(null);

    const [statusBlockchain, setStatusBlockchain] = useState("idle");

    const { account } = useWallet();

    //const { checkIn } = useContext(RentalContext);

    const rentalsStatus = rentals?.filter(rental => {
        if(active === "upcoming") return rental.status === "UPCOMING";
        if(active === "progress") return rental.status === "IN_PROGRESS";
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

                console.log(myRentals.startDate);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoRental();
    }, [account]);

    const handleTryAgain =  () => {
        setTimeout(() => {
            setActive("upcoming");
            setStatusBlockchain("idle");
        }, 2000);
    }

    const handleReview = async (apartment) => {
        setSelectedRental(apartment);
        setCompleteFeedback(true);
    }

    const submitReview = async () => {
        if (!selectedRental) return;
         try{
            setLoading(true);
            const addReviewInfo = {
                idUser: selectedRental.userId,
                idRental: selectedRental.rentalId,
                comment: feedback,
                date: new Date(),
                rating:rating
            }

            console.log(addReviewInfo);
       
            console.log(selectedRental)
            await createReview(addReviewInfo);
            setRentals((prevRentals) =>
                prevRentals.map((rental) =>
                    rental.rentalId === selectedRental.rentalId
                    ? {
                        ...rental,
                        existReview: true,
                        }
                    : rental
                )
                );

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
        console.log("Cancel reantal:", rentalId, tokenId );
    
        try {
            setStatusBlockchain("cancel_rental");
            const txCancel =  await cancelRental(tokenId);
            setStatusBlockchain("cancelling_rental");

            await new Promise(r => setTimeout(r, 2000));
            await txCancel.wait();

            await cancelRentalFromBackend(rentalId);
    
            setRentals(prev => 
                prev.map(rental => rental.rentalId === rentalId 
                    ? {...rental, status:"CANCELLED" } : rental 
                )
            );

            setActive("cancelled");
            setStatusBlockchain("success_cancel_rental");

            setTimeout(() => {
                setStatusBlockchain("idle");        
            }, 2000);

            } catch(err){
                 console.log(err);
                 setStatusBlockchain("error_cancel_rental");
            }
        };

        const handleCheckInRental =  async (apartment) => {
            const {tokenId, rentalId } = apartment;
        
            if (!rentalId || !tokenId) {
                console.error("Invalid apartment info!", apartment);
                return;
            } 

            try {
                setStatusBlockchain("checkIn_rental");
                console.log("checkin", apartment.startDate);
                
                //const startDate = Math.floor(new Date(`${apartment.startDate}T${apartment.checkInFrom}`).getTime() / 1000);
                const startDate = Math.floor(new Date(`${apartment.startDate}T00:00:00`).getTime() / 1000);
                console.log("startDate:", startDate);
                const txCheckIn =  await checkInBlockchain(tokenId, startDate);
                setStatusBlockchain("checking_in_rental");

                await new Promise(r => setTimeout(r, 2000));
                await txCheckIn.wait();

                await checkInRentalFromBackend(rentalId);
                    
                setRentals(prev => 
                    prev.map(rental => rental.rentalId === rentalId 
                        ? {...rental, status:"IN_PROGRESS" } : rental 
                    )
                );

                setActive("progress");
                setStatusBlockchain("success_checkIn_rental");

                setTimeout(() => {
                    setStatusBlockchain("idle");        
                }, 2000);

                } catch(err){
                    setErrorCheckIn(err.message);
                    console.log("Error from check-in:", err.message);
                    setStatusBlockchain("error_checkIn_rental");
                }
        };

        const handleCheckOutRental =  async (apartment) => {
            const {tokenId, rentalId } = apartment;
        
            if (!rentalId || !tokenId) {
                console.error("Invalid apartment info!", apartment);
                return;
            } 

            try {
                setStatusBlockchain("checkOut_rental");
                const txCheckOut =  await checkOutBlockchain(tokenId);
                setStatusBlockchain("checking_out_rental");

                await new Promise(r => setTimeout(r, 2000));
                await txCheckOut.wait();

                await checkOutRentalFromBackend(rentalId);
                    
                setRentals(prev => 
                    prev.map(rental => rental.rentalId === rentalId 
                        ? {...rental, status:"COMPLETTED" } : rental 
                    )
                );

                setStatusBlockchain("success_checkOut_rental");

                setTimeout(() => {
                    setStatusBlockchain("idle");        
                }, 2000);

                } catch(err){
                    setErrorCheckIn(err.message);
                    console.log("Error from check-out:", err.message);
                    setStatusBlockchain("error_checkOut_rental");
                }
        };

        /*
        const isDayForCheckIn = (currentDate, dateForCheckIn) => {
            const today =
                currentDate.getFullYear() === dateForCheckIn.getFullYear() &&
                currentDate.getMonth() === dateForCheckIn.getMonth() && 
                currentDate.getDate() === dateForCheckIn.getDate();
            return today;
        }

        const isDayForCheckOut = (currentDate, dateForCheckOut) => {
            const today =
                currentDate.getFullYear() === dateForCheckOut.getFullYear() &&
                currentDate.getMonth() === dateForCheckOut.getMonth() && 
                currentDate.getDate() === dateForCheckOut.getDate();
            return today;
        }
        */

        const isCurrentDay = (currentDate, dateForCheck) => {
            const today =
                currentDate.getFullYear() === dateForCheck.getFullYear() &&
                currentDate.getMonth() === dateForCheck.getMonth() && 
                currentDate.getDate() === dateForCheck.getDate();
            return today;
        }

        const isValidCancel = (currentDate, dateForCheckIn) => {
            const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const checkIn = new Date(dateForCheckIn.getFullYear(), dateForCheckIn.getMonth(), dateForCheckIn.getDate());
            return today < checkIn;
        }

         const validCancel = (rental) => {
            const currentDate = new Date();
            console.log("(CANCEL)Current date:", currentDate);
            const startDateCheckIn = new Date(`${rental.startDate}T${rental.checkInFrom}`);
            console.log("(CANCEL)Date for check-in", startDateCheckIn);

            const today = isValidCancel(currentDate, startDateCheckIn);
           
            console.log("You can cancel rental:", today);

            return rental.status === "UPCOMING" && today;
        }

        const validCheckIn = (rental) => {
            const currentDate = new Date();
            console.log("(CHECK-IN)Current date for check-in:", currentDate);
            const startDateCheckIn = new Date(`${rental.startDate}T${rental.checkInFrom}`);
            const endDateCheckIn = new Date(`${rental.startDate}T${rental.checkInUntil}`);
            console.log("(CHECK-IN)Start date for checkin", startDateCheckIn);
            console.log("(CHECK-IN)End date for checkin", endDateCheckIn);

            const today = isCurrentDay(currentDate, startDateCheckIn);
            console.log("You can checkIn:", today);

            const canCheckIn = currentDate >= startDateCheckIn && currentDate <= endDateCheckIn;
            console.log(canCheckIn);

            return rental.status === "UPCOMING" && today && canCheckIn;
        }

        const validCheckOut = (rental) => {
            const currentDate = new Date();
            console.log("(CHECK-OUT)Current date:", currentDate);
            const startDateCheckOut = new Date(`${rental.endDate}T${rental.checkOutFrom}`);
            console.log("(CHECK-OUT)Date for check-out", startDateCheckOut);

            const today = isCurrentDay(currentDate, startDateCheckOut);
            console.log("You can checkOut:", today);

            return rental.status === "IN_PROGRESS" && today;
        }

        const transactionStatus = {
            cancel_rental: {
                title: "Cancel Rental",
                description: "Please confirm the transaction in your wallet to cancel rental from the marketplace!"
            },

            cancelling_rental: {
                title: "Cancelling Rental...",
                description: "Your reantal is being cancelled from the marketplace!"
            }, 

            success_cancel_rental: {
                title: "Rental Cancelled Successfully!",
                description: "Your rental has been removed from the marketplace."
            },  

            checkIn_rental: {
                title: "Initiating check-in",
                description: "Please confirm the transaction in your wallet and wait for the process to complete!"
            }, 

            checking_in_rental: {
                title: "Check-in in progres",
                description: "Your check-in is being processed on the marketplace!"
            }, 

            success_checkIn_rental: {
                title: "Check-in completed successfully!",
                description: "Your reservation is now active."
            }, 

            checkOut_rental: {
                title: "Initiating check-out!",
                description: "Please confirm the transaction in your wallet and wait for the process to complete!"
            }, 

            checking_out_rental: {
                title: "Check-out in progress",
                description: "Your check-out is being processed on the marketplace!"
            }, 

            success_checkOut_rental: {
                title: "Check-out completed successfully!",
                description: "Your reservation is completted."
            }
        }

    const BlockchainStatusTransaction = ({status}) => {
        if(!status || !transactionStatus[status])
            return null;

        const {title, description} = transactionStatus[status];

        return (
            <div className="edit-container">
                <div className="modal-reservation">
                {(status === "success_cancel_rental" || 
                    status === "success_checkIn_rental" || 
                        status === "success_checkOut_rental") ? 
                   <FaRegCheckCircle className="icon-reservation-status confirmed"/>
                    :  
                    <LuHourglass className="icon-reservation-status hourglass"/>}    
                        <h2>{title}</h2>
                        <p>{description}</p>
                </div>
            </div>
        );
    }

    if (error) 
        return (
            <div className="error-info">
                <IoMdWarning className="icon-error"/> 
                <p className="description-error">{error}!</p>
            </div>
    );

    return (
        <div>
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

                                <div className={`rentals-filters ${active === 'progress' ? "active" : ""}`}
                                    onClick={() => setActive("progress")}
                                >
                                    <FaCheckCircle className="sidebar-icon" />
                                    <span>In progress</span>
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
                                                   
                                                        <p className="rental-price">{rental.totalPrice} EUR</p>
                                                    

                                                    <div className="buttons-status">

                                                    { active === "upcoming" && (
                                                        <div className="buttons-status-rentals"> 
                                                            { validCancel(rental) && (
                                                                <button 
                                                                    className="button-review"
                                                                    onClick={() => handleCancelRental(rental)}
                                                                >
                                                                Cancel
                                                            </button>
                                                            )}
                                                            
                                                             { validCheckIn(rental) && (
                                                                <button 
                                                                    className="button-review"
                                                                    onClick={() => handleCheckInRental(rental)}
                                                                >
                                                                    Check-in
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) }

                                                    { active === "progress" && (
                                                        <div className="buttons-status-rentals"> 
                                                           { validCheckOut(rental) && (
                                                                <button 
                                                                    className="button-review"
                                                                    onClick={() => handleCheckOutRental(rental)}
                                                                >
                                                                    Check-out
                                                                </button>
                                                           )}
                                                        </div>
                                                    )}
                                                    
                                                    { active === "completed" && 
                                                        (
                                                        <button
                                                            className="button-review"
                                                            onClick={() => handleReview(rental)}
                                                            disabled={rental.existReview}
                                                        >
                                                            {rental.existReview ? "Reviewed" : "Review"}
                                                        </button>
                                                        ) 
                                                    }
                                                    </div>
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
                                            onClick={() => {setCompleteFeedback(false)
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
                                            {loading ? 
                                            (
                                                <div className="spinner">
                                                    <ClipLoader loading={loading} size={40} />
                                                </div>
                                            ):'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )} 
                    </div>
                </div>
            </div>  

        <BlockchainStatusTransaction status={statusBlockchain} />
       {(statusBlockchain === "error_cancel_rental"  || 
            statusBlockchain === "error_checkIn_rental" ||
            statusBlockchain === "error_checkOut_rental")  && (
                <div className="edit-container">
                    <div className="modal-reservation">
                        <IoMdCloseCircle  className="icon-reservation-status canceled"/>
                        <h2>Something went wrong...</h2>
                        {statusBlockchain === "error_checkIn_rental"  ? (
                        <p>{errorCheckIn}</p>) : ""}
                        <button 
                            className="try-again"
                            type="button"
                            onClick = {() => handleTryAgain()}
                        >
                        Try again
                        </button>
                     </div>
                </div>
            )}

           
        </div> 
    );
}


