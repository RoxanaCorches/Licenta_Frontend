import "../../App.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { RxRulerSquare } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllApartments, getFilteredApartments } from "../../services/backend/ApartmentService";
import ChartBar from "../ChartBar";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";

export default function PropertiesImages({filterProperties}) {
    const [properties, setProperties] = useState([]);
    const [nrProperties, setNrProperties] = useState(10);
    const [infoChartBar, setInfoChartBar] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            const loadInfoApartment = async () => {
                 setLoading(true);
                 setError(false);
            try{
                 let data;
                 let dataFiltered;
                 if(!filterProperties) {
                    data = await getAllApartments();
                 } else {
                    const {location, checkIn, checkOut, guests, rooms} = filterProperties;
                    const firstWordLocation = location.split(/[\s,-]/)[0]; 
                    const checkInDate = checkIn.toISOString().split('T')[0];
                    const checkOutDate = checkOut.toISOString().split('T')[0];

                    console.log(firstWordLocation, checkInDate, checkOutDate, guests, rooms);
                    dataFiltered = await getFilteredApartments(firstWordLocation, checkInDate, checkOutDate, guests, rooms);
                    console.log("cele filtrate:", dataFiltered);
                 }
                    
                    const showData = dataFiltered && dataFiltered.length > 0 ? dataFiltered : (filterProperties ? [] : data);
                    
                    setProperties(showData);
                    
                    if(showData) {
                        const labels = dataFiltered?.map(apartment => apartment?.title);
                        const prices = dataFiltered?.map(price => price?.pricePerNight);
                        console.log("Labels:", labels);
                        console.log("Prices:", prices);

                        const infoChart = labels?.map((label, i) => ({
                            apartment: label,
                            price: prices[i]
                        }));

                        setInfoChartBar(infoChart?.length > 0 ? infoChart : []);
                        console.log(infoChart);
                    }
                    
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadInfoApartment();
      
    }, [filterProperties]);

    
    if (error) 
    return (
        <div className="error-info">
            <IoMdWarning className="icon-error"/> 
            <p className="description-error">{error}!</p>
        </div>
    );

    return (
        <div > 
            <div className="propertiesImages-container">
                { infoChartBar.length > 0 &&
                    <div>
                        <ChartBar info={infoChartBar} />
                    </div>  
                }
            </div>

            {loading ? (
                <div className="spinner">
                    <ClipLoader loading={loading} size={40} />
                </div>
            ):(
                <div className="propertiesImages-container"> 
                {
                    properties?.slice(0, nrProperties).map((property) => (
                        <div className="property-card" key={property?.idApartment}>
                            <div className="image-container">
                                <img src={property?.imageMain} alt={property?.title}/>
                            </div>     

                            <div className="image-container-details">
                                <div className="details"> 
                                    <div className="property-details">
                                        <h1 className="name-property">{property?.title}</h1>
                                        <h2 className="price">{property?.pricePerNight} EUR / night</h2>
                                        
                                        <div className="location"> 
                                            <FaLocationDot className= "icon-location"/>
                                            <p className="address">{property?.street}, {property?.city}, {property?.country}</p>
                                        </div>
                                    </div>    

                                    <div className="property-amenities">
                                        <div className="bedrooms">
                                            <IoBed className="icon"/>
                                            <p>{property?.bedrooms} Bedrooms</p>
                                        </div>

                                        <div className="bathrooms">
                                            <FaBath className="icon"/>
                                            <p>{property?.bathrooms} Bathrooms</p>
                                        </div>

                                        <div className="area">
                                            <RxRulerSquare className="icon"/>
                                            <p>{property?.area}m²</p>
                                        </div>
                                    </div> 
                                </div> 

                                {property?.blockchainAddress?.toLowerCase() === (localStorage.getItem("walletAddress"))?.toLowerCase() ?
                                    (   <div className="check-availability">
                                            <button>Your Property</button>
                                        </div>  
                                    
                                    )
                                    : ( <div className="check-availability">
                                            <Link to={`/properties/property/${property?.idApartment}`}>
                                                <button>Check Availability</button>
                                            </Link>
                                        </div>  
                                    )
                                }
                            </div> 
                        </div>    
                    ))
                }
                <div className="button-load-results">
                        {nrProperties < properties?.length ? (
                            <button
                                className="button-load-more"
                                onClick={() => setNrProperties(prev => prev + 3)}
                            >
                                View more results
                            </button>
                        ) :(
                                                
                        <p>End of results list.</p>
                        )}
                    </div>
                </div>
                )}
        </div>
    );
}