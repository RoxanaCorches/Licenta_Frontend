import img1 from "../assets/5.jpg";
import img2 from "../assets/10.jpg";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function AboutPage() {

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

        
            <div className="main-container-start-page">
                <div className="startpage-container"> 
                <p className="h1-startpage">How It Works</p>
                <p className="description-startpage">Get started in 4 simple steps</p>
                </div>

                <div className="cards-information">
                <div className="card">
                
                    <p className="card-title">1. Connect Wallet</p>
                    <p className="card-description">Connect with your crypto wallet.</p>
                </div>

                <div className="card">
                
                    <p className="card-title">2. Browse Properties</p>
                    <p className="card-description">Explore properties anywhere in the world.</p>
                </div>

                <div className="card">
                    <p className="card-title">3. Book & Pay</p>
                    <p className="card-description">Book and pay with crypto wallet.</p>
                </div>

                <div className="card">
                    <p className="card-title">4. Enjoy Your Stay</p>
                    <p className="card-description">Relax. Enjoy your perfect adventure.</p>
                </div>
                </div>
            </div>
                
        </div>
    );
}