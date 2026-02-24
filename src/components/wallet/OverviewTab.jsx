import { FaWallet } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";

export default function OverviewTab() {
    return(
        <div className="overview"> 
            <div className="card">
                <div className="card-header-balance">
                    <FaWallet />
                    <p>Available Balance</p>
                </div>
                <div className="card-body">$2,450</div>
            </div>

            <div className="card">
                <div className="card-header-pending">
                     <BsHourglassSplit />
                    <p>Pending Earnings</p>
                    </div>
                <div className="card-body">$780</div>
            </div>

            <div className="card">
                <div className="card-header-spend">
                    <FaCreditCard />
                    <p>Total Spent</p>
                </div>
                <div className="card-body">$1,200</div>
            </div>
        </div>
    );
}