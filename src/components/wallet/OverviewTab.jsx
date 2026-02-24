export default function OverviewTab() {
    return(
        <div className="overview"> 
            <div className="card">
                <div className="card-header-balance">Available Balance</div>
                <div className="card-body">$2,450</div>
            </div>

            <div className="card">
                <div className="card-header-pending">Pending</div>
                <div className="card-body">$780</div>
            </div>

            <div className="card">
                <div className="card-header-spend">Total Spent</div>
                <div className="card-body">$1,200</div>
            </div>
        </div>
    );
}