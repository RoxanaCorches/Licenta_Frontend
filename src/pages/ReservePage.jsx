import Navbar from "../components/Navbar";
import ReserveForms from "../components/property/ReserveForms";

export default function ReservePage() {
    return(
        <div className="properties-container">
            <div className="properties-content">
                 <ReserveForms />   
            </div>
        </div>
    );
}