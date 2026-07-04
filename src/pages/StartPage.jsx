import { useNavigate } from "react-router-dom";
import "../App.css";
import { RiGlobalLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineBolt } from "react-icons/hi2";

export default function StartPage() {
  const navigate = useNavigate();

  const handleProperties =  () => {
    setTimeout(() => {
        navigate("/properties");       
    }, 1000);
  }

  const handleAboutUs =  () => {
    setTimeout(() => {
        navigate("/about");       
    }, 1000);
  }

  return (
    <div>
      <div className="main-container-start-page">
        <div className="startpage-container"> 
          <p className="container-future">🌇The Future of Property Rentals</p>
          <p className="h1-startpage">Decentralized</p>
          <p className="title-startpage">Property Booking</p>
          <p className="description-startpage">Book amazing properties worldwide with blockchain security, 
            instant crypto <br />payments, and transparent smart contracts.</p>
        </div>

        <div className="buttons-startpage">
          <button
              className="button-proprieties"
              type="button"
              onClick={() => handleProperties()}
          >
            Browse Properties
          </button>

          <button
              className="button-about-us"
              type="button"
              onClick={() => handleAboutUs()}
          >
            About Us
          </button>
        </div>
      </div>

      <div className="main-container-start-page">
        <div className="startpage-container"> 
          <p className="h1-startpage">Why Choose BlockStay?</p>
          <p className="description-startpage">Modern property rentals with blockchain technology.</p>
        </div>

        <div className="cards-information">
          <div className="card">
            <RiSecurePaymentLine className="icon"/>
            <p className="card-title">Trusted Transactions</p>
            <p className="card-description">Smart contracts keep every booking safe and transparent.</p>
          </div>

          <div className="card">
            <RiGlobalLine className="icon"/>
            <p className="card-title">Global Booking</p>
            <p className="card-description">Explore and book properties anywhere in the world with crypto payments.</p>
          </div>

          <div className="card">
            <HiOutlineBolt className="icon"/>
            <p className="card-title">Instant Payments</p>
            <p className="card-description">Receive payments instantly with blockchain transactions.</p>
          </div>

          <div className="card">
            <IoWalletOutline className="icon"/>
            <p className="card-title">Low Fees</p>
            <p className="card-description">Save money with blockchain payments.</p>
          </div>
        </div>
      </div>

      <div className="main-container-start-page-ready">
        <div className="startpage-container"> 
          <p className="h1-startpage-ready">Ready to Get Started?</p>
          <p className="description-startpage-ready">Join a global community of travelers and hosts on BlockStay. Rent smarter, faster, and safer.</p>
        </div>

        <div className="buttons-startpage">
          <button
              className="button-exploring"
              type="button"
              onClick={() => handleProperties()}
          >
            Start Exploring
          </button>
        </div>
    

        
      </div>
    </div>
  );
}
