import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import "../../App.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import Calendar from "../Calendar";
import { Link } from "react-router-dom";

export default function RelevantInfo() {
    const images = [img2, img2, img2, img2, img3, img3, img4, img4, img2];

    return(
       <div className="info-container"> 
            <div className="info-header">
                <div className="header">
                    <h2 className="title">Nume apartament</h2>
                    <p>info despre locatie</p>
                </div>

                <div className="reserve-button">
                    <Link to={`/properties/property/id/reserve`}>
                        <button>Reserve now</button>
                    </Link>
                </div>
            </div>

            <div className="info-images">
                <div className="main-image">
                    <img src={images[0]} alt="Main" />
                </div>

                <div className="side-images">
                    {images.slice(1, 5).map((img, index) => (
                    <img key={index} src={img} alt={`Image ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className="place-description">
                <h2 className="title">About this place</h2>
                <p>Aici o sa fie descrierea pe care o scrie user la listare apartament
                    
                </p>
            </div>

            <div className="place-availability">
                <h2 className="title">Availability</h2>
                    <Calendar className="calendar"/>
            </div>

            <div className="place-amenities">
                <h2 className="title">Amenities</h2>
                <div className="amenities">
                   <div className="icon-amenities">
                        <FaRegCheckCircle className="icon"/>
                        <p>bucatarie</p>  
                   </div> 

                   <div className="icon-amenities">
                        <FaRegCheckCircle className="icon"/>
                        <p>bucatarie</p>  
                   </div> 

                   <div className="icon-amenities">
                        <FaRegCheckCircle className="icon"/>
                        <p>bucatarie</p>  
                   </div> 
                </div>
            </div>

            <div className="place-policies">
                <h2 className="title">Policies</h2>
                <div className="house-rules">
                    <div className="checkIn-checkOut">
                        <h2>Entry & Exit Times</h2>
                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Check-in: 3PM-9PM</p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Check-out: 3PM-9PM</p>
                        </div>
                    </div>

                    <div className="checkIn-checkOut">
                        <h2>While You’re Here</h2>
                        <div className="check"> 
                            <FaUsers className="icon"/> 
                            <p>Maximum guests:</p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Pets allowed: </p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Smoking allowed:</p>
                        </div>

                        <div className="check"> 
                            <IoMdTime className="icon"/> 
                            <p>Parties or events allowed:</p>
                        </div>

                         
                        
                    </div>


                   
                </div>
            </div>        
                
            

           
            
       </div>
    );
}