import img1 from "../assets/5.jpg";
import img2 from "../assets/10.jpg";
import img3 from "../assets/1.jpg";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function About() {

    const [loading, setLoading] = useState(true);
    return(
        <div className="about-container">
            <div className="about-content">
                <div className="content-left">
                    <h1>Transparency and trust in rentals</h1>
                    <p className="description">
                        BlockStay is an innovative apartment rental platform, created to make it easy for people to find or rent apartments. 
                        The application purpose is to bring transparency, security, and speed to rentals, eliminating intermediaries and hidden fees. 
                    </p>
                </div>
                <div className="content-right"> 
                    {loading && (
                        <div className="spinner">
                            <ClipLoader loading={loading} size={40} />
                        </div>
                    )} 
                   <img 
                        src={img2} 
                        alt="NameImage"
                        onLoad={() =>setLoading(false)}
                    />
                </div>
            </div>

            <div className="about-content">
                
                <div className="content-right"> 
                    {loading && (
                        <div className="spinner">
                            <ClipLoader loading={loading} size={40} />
                        </div>
                    )} 
                   <img 
                        src={img1} 
                        alt="NameImage"
                        onLoad={() =>setLoading(false)}
                    />
                </div>
                <div className="content-left">
                    <h1>Instant and secure accommodation</h1>
                    <p>Thanks to blockchain technology, your reservations are processed quickly, payments are made 
                        instantly using cryptocurrencies, and every transaction is transparent. 
                        Don't hesitate to book the properties you want, without paying additional fees, directly from the owners.
                    </p>
                </div>
            </div>

         <div className="about-content">
                <div className="content-left">
                    <h1>How it works</h1>
                    
                        <p></p>

                    
                </div>
                <div className="content-right"> 
                    {loading && (
                        <div className="spinner">
                            <ClipLoader loading={loading} size={40} />
                        </div>
                    )}  
                   <img 
                        src={img3} 
                        alt="NameImage"
                        onLoad={() =>setLoading(false)}
                    />
                </div>
        </div>
        </div>
    );
}