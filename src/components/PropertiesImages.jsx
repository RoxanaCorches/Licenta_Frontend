import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";


import "../App.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { RxRulerSquare } from "react-icons/rx";

export default function PropertiesImages() {
    const images = [img2, img2, img2, img2, img3, img3, img4, img4, img2];

    return (
        <div className="propertiesImages-container"> 
        {
            images.map((image, index) => (
                <div className="property-card" key={index}>
                    <div className="image-container">
                        <img src={image} alt={`Image ${index + 1}`}/>
                    </div>     

                    <div className="image-container-details">

                        <div className="details"> 
                        <div className="property-details">
                            <h1 className="name-property">Old Town Boutique Hotel</h1>
                            <h2 className="price">$2,345 / day</h2>
                            
                            <div className="address"> 
                                <FaLocationDot />
                                <p className="address">790 7th Ave, New York, USA</p>
                            </div>
                        </div>    

                        <div className="property-amenities">
                            <div className="bedrooms">
                                <IoBed className="icon"/>
                                <p>Bedrooms</p>
                            </div>

                            <div className="bathrooms">
                                <FaBath className="icon"/>
                                <p>Bathrooms</p>
                            </div>

                            <div className="area">
                                <RxRulerSquare className="icon"/>
                                <p>42m²</p>
                            </div>
                        </div> 
                        </div> 

                        <div className="check-availability">
                            <button >Check Availability</button>
                        </div>   
                    </div> 
                </div>    
            ))
        }
        </div>
        
    );
}