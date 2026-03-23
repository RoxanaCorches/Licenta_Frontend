import "../../App.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import Calendar from "../Calendar";
import { Link, useParams } from "react-router-dom";
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

export default function RelevantInfo() {
    const [property, setProperty] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { checkIn, checkOut, nrNights } = useContext(RentalContext);

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
    console.log("Id-ul user ului conectat:", localStorage.getItem("userId"));
    
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

    function convertTime(time) {
        const [hours, minutes] = time.split(":");
        let hour = parseInt(hours, 10);
        const amPm = hour < 12 ? "AM" : "PM";
       
        return `${hour}:${minutes} ${amPm}`;
    }

    if (loading) return <p>Se încarcă proprietățile...</p>;
    if (error) return <p>Eroare: {error}</p>;
    
    return(
       <div className="info-container"> 
            <div className="info-header">
                <div className="header">
                    <h2 className="title">{property.title}</h2>
                    <p><IoLocation className="suggestion-icon"/> {property.street}, {property.city}, {property.country}</p>
                </div>

                
            </div>

            <div className="info-images">
               {property && property.imageMain && (
                <div className="main-image">
                    <img src={property.imageMain} alt={property.title || "Apartament"} />
                </div>
                )}

            
               {property && (
                <div className="side-images">
                    {[property.image1, property.image2, property.image3, property.image4]
                    .filter(img => img) 
                    .map((img, index) => (
                        <img
                        key={index}
                        src={`http://localhost:8080${img}`}
                        alt={property.title || "Apartament"}
                        />
                    ))}
                </div>
                )}
            </div>

            <div className="place-description">
                <h2 className="title">About this place</h2>
                <p>{property.description}</p>
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
                        <p className="numbers-nights">{nrNights} nights in {property.city} </p>
                        <p className="dates">{checkIn?.toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} - {checkOut?.toLocaleDateString("en-US",{ year:"numeric", month:"short", day:"numeric"})} </p>
                    </div>
                )}

                 <div className="calendar-form-reserve">
                    <Calendar className="calendar"/>
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
                                        CHECK-IN: {checkIn.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </p>

                                    <p className="dates">
                                        CHECK-OUT: {checkOut.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </p>

                                    <p className="dates">{property.pricePerNight} ETH × {nrNights} nights  </p>
                                    <p className="total-price"> <span> Total</span> {nrNights * property.pricePerNight} ETH</p>
                                </div>
                            )}
                        </div>

                        <div className="reserve-button">
                            <Link to={`/properties/property/${idApartment}/reserve`}>
                                <button>Reserve now</button>
                            </Link>
                        </div>
                        
                    </div>
                </div>   
               

            </div>

            <div className="place-amenities">
                <h2 className="title">Amenities</h2>
                <div className="amenities">
                    {listAmenities
                        .filter(facility => property[facility.key])
                        .map((facility, index) => (
                        <div className="icon-amenities" key={index}>
                            <FaRegCheckCircle className="icon" />
                            <p>{facility.label}</p>
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
                            <p>Check-in: {convertTime(property.checkInFrom)} -  {convertTime(property.checkInUntil)}</p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Check-out: {convertTime(property.checkOutFrom)} -  {convertTime(property.checkOutUntil)}</p>                          
                        </div>
                    </div>

                    <div className="checkIn-checkOut">
                        <h2>While You’re Here</h2>
                        <div className="check"> 
                            <FaUsers className="icon"/> 
                            <p>Maximum guests: {property.guests}</p>
                        </div>

                        <div className="check"> 
                            <p>{property.petsAllowed ? <MdOutlinePets className="icon"/> : <TbPawOff className="icon"/> }</p>
                            <p>{property.petsAllowed ? "Pets are allowed!" : "Pets are not allowed!"}</p>
                        </div>

                        <div className="check"> 
                            <p>{property.smokingAllowed ? <FaSmoking className="icon"/> : <FaSmokingBan className="icon"/> }</p>
                            <p>{property.smokingAllowed ? "Smoking is allowed!" : "Smoking is not allowed!"}</p>
                        </div>

                        <div className="check"> 
                            <p>{property.partiesAllowed ? <GiPartyPopper className="icon"/> : <BiSolidVolumeMute className="icon"/> }</p>
                            <p>{property.partiesAllowed ? "Parties or events are allowed!" : "Parties or events are not allowed!"}</p>
                        </div>
                    </div>
                </div>
            </div>        
       </div>
    );
}