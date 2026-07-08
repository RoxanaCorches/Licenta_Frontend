import "../../App.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import Calendar from "../Calendar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getApartmentById } from "../../services/backend/ApartmentService";
import { MdOutlinePets } from "react-icons/md";
import { TbPawOff } from "react-icons/tb";
import { FaSmoking } from "react-icons/fa";
import { FaSmokingBan } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { BiSolidVolumeMute } from "react-icons/bi";
import { RentalContext } from "../../hooks/RentalContext";
import { NavItem } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import { useWallet } from "../../hooks/WalletContext";
import { getReviewsForApartment } from "../../services/backend/ReviewService";
import { FaStar } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";
import { GiLaurelCrown } from "react-icons/gi";


export default function RelevantInfo() {
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nrReviews, setNrReviews] = useState(4);

    const { account } = useWallet();
    const { checkIn, checkOut, nrNights } = useContext(RentalContext);

    const navigate = useNavigate();

    const listAmenities = [
        { key: "tv", label: "TV" },
        { key: "wifi", label: "Wifi" },
        { key: "kitchen", label: "Kitchen" },
        { key: "washer", label: "Washer" },
        { key: "air_conditioning", label: "Air conditioning" },
        { key: "pool", label: "Pool" },
        { key: "hot_tub", label: "Hot Tub" },
        { key: "BBQ_grill", label: "BBQ grill" },
        { key: "pool_table", label: "Pool Table" },
        { key: "indoor_fireplace", label: "Indoor Fireplace" },
        { key: "piano", label: "Piano" },
        { key: "balcony", label: "Balcony" },
        { key: "terrace", label: "Terrace" },
        { key: "garden_view", label: "Garden View" },
        { key: "ski_out", label: "Ski-Out" },
        { key: "lake_access", label: "Lake Access" },
        { key: "beach_acces", label: "Beach Access" }
        ];

    const {idApartment} = useParams();

    console.log("Id apartment:" + idApartment)
    console.log("Id-ul user ului conectat cu localStorage:", localStorage.getItem("userId"));
    console.log("Wallet Address al  user ului conectat:", account);
    
    useEffect(() => {
        const loadInfoProperty = async () => {
            try {
                setLoading(true);
                const data = await getApartmentById(idApartment);
                setProperty(data);
                console.log("Info:", data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoProperty();
    }, [idApartment]);


    
    useEffect(() => {
        const loadInfoReview = async () => {
            try {
                setLoading(true);
                const data = await getReviewsForApartment(idApartment);
                setReviews(data);
                console.log("Reviews info for apartment:", data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
            loadInfoReview();
    }, [idApartment]);

    function convertTime(time) {
        if(!time) return "";
        const [hours, minutes] = time.split(":");
        let hour = parseInt(hours, 10);
        const amPm = hour < 12 ? "AM" : "PM";
       
        return `${hour}:${minutes} ${amPm}`;
    }

    const calculateRting = (reviews) => {
        if(!reviews || reviews?.length === 0 ) return 0;

        const totalRating = reviews.reduce((acc, rev) => acc + rev.rating, 0);
        const nrReviews = reviews.length;
        const average = (totalRating / nrReviews).toFixed(2);

        return  average;
    }

    const totalPrice = nrNights * property?.pricePerNight;
    const validReserve = nrNights > 0 && 
                         property?.pricePerNight &&
                         totalPrice > 0;

    const averageRating = reviews?.length > 0 ? calculateRting(reviews) : "No reviews yet";

    if (error) 
    return (
        <div className="error-info">
            <IoMdWarning className="icon-error"/> 
            <p className="description-error">{error}!</p>
        </div>
    );
    
    return(
       <div className="info-container"> 
        {loading ? (
                        <div className="spinner">
                            <ClipLoader loading={loading} size={40} />
                        </div>
                    ): (

                    <div>

            <div className="info-header">
                <div className="header">
                    <h2 className="title">{property?.title}</h2>
                    <div className="rating-location"> 
                        <div className="rating-stars-header">
                            {[...Array(5)].map((_, i) =>
                            i < averageRating && <FaStar key={i} /> 
                            )}
                        </div>

                        <div className="icon-location-info-location">
                            <p><IoLocation className="icon"/></p>
                            <p>{property?.street}, {property?.city}, {property?.country}</p>
                        </div>
                    </div>
                </div>

                
            </div>

            <div className="info-images">
               {property && property?.imageMain && (
                <div className="main-image">
                    <img src={property?.imageMain} alt={property?.title || "Apartament"} />
                </div>
                )}

            
               {property && (
                <div className="side-images">
                    {[property?.image1, property?.image2, property?.image3, property?.image4]
                    .filter(img => img) 
                    .map((img, index) => (
                        <img

                        key={index}
                        src={`data:image/png;base64,${img}`}
                        alt={property?.title || "Apartament"}
                        />
                    ))}
                </div>
                )}
            </div>

            <div className="place-description">
                <h2 className="title">About this place</h2>
                <p>{property?.description}</p>
            </div>

            <div className="place-availability">
                {!checkIn ? (
                    <div className="checkIn-checkOut">
                        <h2 className="title">Select check-in date</h2>
                        <p className="">Add your travel dates for exact pricing</p>
                    </div>
                ) : !checkOut ? (<h2 className="title">Select check-out date</h2>

                ) : (
                    <div className="dates-checkIn-checkOut">
                        <p className="numbers-nights">{nrNights} nights in {property?.city} </p>
                        <p className="dates">{checkIn?.toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} - {checkOut?.toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} </p>
                    </div>
                )}

                 <div className="calendar-form-reserve">
                    <Calendar tokenId={property?.tokenId} className="calendar"/>
                    <div className="form-reserve">
                        <h2>Add dates for prices</h2>

                        <div className="container-booking">
                            {!checkIn && !checkOut ? (
                                <div className="info-booking">
                                    <p className="dates add-dates">CHECK-IN: Add dates</p>
                                    <p className="dates add-dates">CHECK-OUT: Add dates</p>
                                </div>
                            ) : checkIn && !checkOut ? (
                                    <div className="info-booking"> 
                                        <p className="dates add-dates">
                                        CHECK-IN: {checkIn.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </p>
                                        <p className="dates add-dates">CHECK-OUT: Add dates</p>
                                     </div>
                            ) : !checkIn && checkOut ? (
                                    <div> 
                                        <p className="dates add-dates">CHECK-IN: Add dates</p>
                                        <p className="dates add-dates">
                                        CHECK-OUT: {checkOut.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </p>
                                     </div>
                            ) : (
                                <div className="info-booking">
                                    <p className="dates">
                                        CHECK-IN: {checkIn?.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </p>

                                    <p className="dates">
                                        CHECK-OUT: {checkOut?.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </p>

                                    <p className="dates">{property?.pricePerNight} EUR × {nrNights} nights  </p>
                                    { validReserve && (
                                        <p className="total-price"> <span> Total</span> {totalPrice} EUR</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="reserve-button">
                            <button
                                onClick={() => {
                                    if(validReserve) {
                                        navigate(`/properties/property/${idApartment}/reserve`);
                                    }
                                }}
                                disabled={!validReserve}
                             >  
                                Reserve now
                            </button>
                        </div>
                        
                    </div>
                </div>   
            </div>

        {reviews?.length > 0 ? (
            <div className="place-amenities">
                <div className="header-review">
                    <div className="rating">
                        <GiLaurelCrown className="icon-review"/>
                        <p className="average-rating">{averageRating}</p>
                        <GiLaurelCrown className="icon-review"/>
                    </div>
                    <p className="title-review">{reviews?.length} reviews</p>
                </div>

                <div className="">
                    {reviews?.length > 0 ? (
                        <div className="reviews-container">
                            {reviews?.slice(0, nrReviews).map((review) => (
                                <div className="apartment-card-wrapper" key={review.id}>
                                    <div className="review-card">
                                        <div className="review-header">
                                            <div className="first-letter">
                                                <p>{review.firstName[0]}</p> 
                                            </div>
                                            <div className="details-rentals">
                                                <p className="name-renter">{review.firstName} {review.lastName}</p>
                                                <p className="date-rental">{new Date (review.date).toLocaleDateString("en-US",{ year:"numeric", month:"long", day:"numeric"})}</p>
                                            </div>
                                        </div>
                                                                            
                    
                                        <div className="review-body">
                                            <p className="rating-stars">
                                                {[...Array(5)].map((_, i) =>
                                                    i < review.rating ? <FaStar key={i} /> : <IoIosStarOutline key={i} />
                                                )}
                                            </p>
                                            <p className="name-apartment"> {review.comment}</p>
                                        </div>   
                                    </div>
                                </div>
                            ))}
                                                  
                                                                                      
                            <div className="button-load-results">
                                {nrReviews < reviews?.length ? (
                                    <button
                                        className="button-load-more"
                                        onClick={() => setNrReviews(prev => prev + 4)}
                                    >
                                        Show more reviews
                                    </button>
                                ) : (
                                                                
                                    <p>End of reviews list.</p>
                                )}
                            </div>
                        </div>

                    ) : (
                         <div className="no-reviews">
                    
                            <p>No review yet.</p>
                        </div>    
                    )}
                </div>
            </div>

            ) : ("")
        }


            <div className="place-amenities">
                <h2 className="title">Amenities</h2>
                <div className="amenities">
                    {listAmenities
                        .filter(facility => property?.[facility.key])
                        .map((facility, index) => (
                        <div className="icon-amenities" key={index}>
                            <FaRegCheckCircle className="icon" />
                            <p>{facility?.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="place-policies">
                <h2 className="title">Policies</h2>
                <div className="house-rules">
                    <div className="checkIn-checkOut">
                        <h2>Entry & Exit Times</h2>
                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Check-in: {convertTime(property?.checkInFrom)} -  {convertTime(property?.checkInUntil)}</p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Check-out: {convertTime(property?.checkOutFrom)} -  {convertTime(property?.checkOutUntil)}</p>                          
                        </div>
                    </div>

                    <div className="checkIn-checkOut">
                        <h2>While You’re Here</h2>
                        <div className="check"> 
                            <FaUsers className="icon"/> 
                            <p>Maximum guests: {property?.guests}</p>
                        </div>

                        <div className="check"> 
                            <p>{property?.petsAllowed ? <MdOutlinePets className="icon"/> : <TbPawOff className="icon"/> }</p>
                            <p>{property?.petsAllowed ? "Pets are allowed!" : "Pets are not allowed!"}</p>
                        </div>

                        <div className="check"> 
                            <p>{property?.smokingAllowed ? <FaSmoking className="icon"/> : <FaSmokingBan className="icon"/> }</p>
                            <p>{property?.smokingAllowed ? "Smoking is allowed!" : "Smoking is not allowed!"}</p>
                        </div>

                        <div className="check"> 
                            <p>{property?.partiesAllowed ? <GiPartyPopper className="icon"/> : <BiSolidVolumeMute className="icon"/> }</p>
                            <p>{property?.partiesAllowed ? "Parties or events are allowed!" : "Parties or events are not allowed!"}</p>
                        </div>
                    </div>
                </div>
            </div>  
            </div>
            )}
       </div>
    );
}