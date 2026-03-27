import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import { getUserById } from "../services/backend/UsersService";
import { useWallet } from "../hooks/WalletContext";

export default function MyReviewPage() {
    const [active, setActive] = useState('received');
    const [myReviews, setMyReviews] = useState(null);
    const [nrListings, setNrListings] = useState(3);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //const idUser = localStorage.getItem("idUserConnected");
    
    const { account } = useWallet();
    
    useEffect(() => {
        const loadInfoUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(account);
                setMyReviews(data);

                console.log("Info:", data);
                console.log("My reviews:", data.reviewList);
                console.log("Numbers reviews:", data.reviewList.length);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoUser();
        }, [account]);


    const idUserConnected = myReviews.idUser;
    console.log("Id user curent conectat:", idUserConnected);
    const reviewReceived = myReviews?.reviewList?.filter(rev => rev.idUser !== idUserConnected);
    const reviewGiven = myReviews?.reviewList?.filter(rev => rev.idUser === idUserConnected);

    const showReview = active === 'received' ? reviewReceived : reviewGiven;


   if(error){
        return <div>{error}</div>
    }

     if(loading){
        return <div>{loading}</div>
    }


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
                                    <span>Reviews Received({reviewReceived.length})</span>
                                </div>

                                <div className={`reviews-filters ${active === 'given' ? "active" : ""}`}
                                    onClick={() => setActive("given")}
                                >
                                    
                                    <span>Review Given({reviewGiven.length})</span>
                                </div>
                            </div>

                            <div className="rentals-content">
                                {showReview.length > 0 ? (
                                    <div className="apartmnets-container">
                                        {showReview.slice(0, nrListings).map((review) => (
                                            <div className="rental-card-wrapper" key={review.id}>
                                                <div className="review-card">
                                                        <div className="review-header">
                                                            <div className="first-letter">
                                                                {active === 'given' ? "Y" : review?.firstName.[0]}
                                                            </div>
                                                            <div className="details-rentals">
                                                                {active === 'given' ? `${myReviews.firstName} ${myReviews.lastName}` : `${myReviews.firstName}`}
                                                                <p className="date-rental">{new Date (review.date).toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})}</p>
                                                             </div>
                                                        </div>

                                                        <div className="review-body">
                                                            <p className="name-apartment"><span>for:</span> {review.title}</p>
                                                            <p className="rating-stars">{"⭐".repeat(review.rating)}</p>
                                                            <p className="review-comment">{review.comment}</p>
                                                        </div>   
                                                </div>
                                            </div>
                                        ))}
                              
                                                                  
                                        <div className="button-load-results">
                                            {nrListings < myReviews?.reviewList?.length ? (
                                                <button
                                                    className="button-load-more"
                                                    onClick={() => setNrListings(prev => prev + 3)}
                                                >
                                                    View more results
                                                </button>
                                            ) : (
                                            
                                            <p>End of listings list.</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="no-rentals">
                                        <img src="src\assets\suitcase.png" alt="No rentals" />
                                        <p>No listings found.</p>
                                    </div>    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </div>   
    );
}


