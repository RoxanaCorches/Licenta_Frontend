import "react-day-picker/dist/style.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
           <div className="footer-container">
            <div className="footer-columns">
                <div>
                    <h2 className="title-app">BlockStay</h2>
                    <p className="description">Descentralized property booking powered by blockchain technology.</p>
                </div>

                <div>
                    <h3 className="title">Platform</h3>
                    <ul className="list">
                        <li><Link to="/properties">Browser Properties</Link></li>
                        <li><Link to="/listNewProperty">List Property</Link></li>
                        <li><Link to="/myRentals">My Rentals</Link></li>
                        <li><Link to="/myListings">My Listings</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="title">Company</h3>
                    <ul className="list">
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/">Blog</Link></li>
                        <li><Link to="/">Careers</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="title">Legal</h3>
                    <ul className="list">
                        <li><Link to="/">Terms</Link></li>
                        <li><Link to="/about">Privacy</Link></li>
                        <li><Link to="/">Contact</Link></li>
                    </ul>
                </div>
                </div>

                <div className="copyright">
                    <p>&copy; 2026 BlockStay. All rights reserved.</p>
                </div>
           </div>
        </footer>
  );
}
