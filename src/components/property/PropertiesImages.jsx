//import img2 from "../../assets/2.jpg";
//import img3 from "../../assets/3.jpg";
//import img4 from "../../assets/4.jpg";

import "../../App.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { RxRulerSquare } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllApartments } from "../../services/backend/ApartmentService";

export default function PropertiesImages() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const  [error, setError] = useState(null);

    //const images = [img2, img2, img2, img2, img3, img3, img4, img4, img2];

    useEffect(() => {
        const loadInfoApartment = async () => {
            try {
                setLoading(true);
                const data = await getAllApartments();
                setProperties(data);
                console.log("Info:", data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoApartment();
    }, []);

    if (loading) return <p>Se încarcă proprietățile...</p>;
    if (error) return <p>Eroare: {error}</p>;

    return (
        <div className="propertiesImages-container"> 
        {
            properties.map((property) => (
                <div className="property-card" key={property.idApartment}>
                    <div className="image-container">
                        <img src={property.imageMain} alt={property.title}/>
                    </div>     

                    <div className="image-container-details">

                        <div className="details"> 
                        <div className="property-details">
                            <h1 className="name-property">{property.title}</h1>
                            <h2 className="price">{property.pricePerNight} / day</h2>
                            
                            <div className="address"> 
                                <FaLocationDot />
                                <p className="address">{property.street}, {property.city}, {property.country}</p>
                            </div>
                        </div>    

                        <div className="property-amenities">
                            <div className="bedrooms">
                                <IoBed className="icon"/>
                                <p>{property.bedrooms} Bedrooms</p>
                            </div>

                            <div className="bathrooms">
                                <FaBath className="icon"/>
                                <p>{property.bathrooms} Bathrooms</p>
                            </div>

                            <div className="area">
                                <RxRulerSquare className="icon"/>
                                <p>{property.area}m²</p>
                            </div>
                        </div> 
                        </div> 

                        <div className="check-availability">
                            {/*
                            <Link to={`/property/${property.id}`}>
                                <button>Check Availability</button>
                            </Link>
                            */}
                            <Link to={`/properties/property/${property.idApartment}`}>
                                <button>Check Availability</button>
                            </Link>
                        </div>  
                    </div> 
                </div>    
            ))
        }
        </div>
        
    );
}