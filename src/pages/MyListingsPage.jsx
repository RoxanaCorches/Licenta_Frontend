import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { getUserById } from "../services/backend/UsersService";
import { delistNftProperty } from "../services/blockchain/MarketplaceService";
import { deleteApartment } from "../services/backend/ApartmentService";

export default function MyListingsPage() {
    const [myListings, setMyListings] = useState(null);

    const [loading, setLoading] = useState(true);
    const  [error, setError] = useState(null);

    const idUser = localStorage.getItem("userId");

    useEffect(() => {
        const loadInfoUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(idUser);
                setMyListings(data);
                console.log("Info:", data);
                console.log("My listings:", data.apartmentList);
                //console.log("Length lists:", data.apartmentList.length);
                //console.log(data.apartmentList[0].title);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoUser();
    }, [idUser]);

    const handleDelistProperty = async (apartment) => {
            console.log("Delete apartment:", apartment);
            const {idApartment, tokenId } = apartment;

            if (!idApartment || !tokenId) {
                console.error("Invalid apartment info!", apartment);
                return;
            } 
            console.log("Delete apartment:", idApartment, tokenId );

            try{
                await delistNftProperty(tokenId);
                console.log("Delist form marketplace");
                await deleteApartment(idApartment);

                console.log("Delete form database");
              
                setMyListings((prev) => ({
                    ...prev, 
                    apartmentList: prev.apartmentList.filter(
                        (apartment) => apartment.idApartment !== idApartment
                    ),}
                ));
                  alert("Apartment deleted!")
            }catch(err){
                console.log(err);
            }
    }


     if(error){
        return <div>{error}</div>
    }

     if(loading){
        return <div>{loading}</div>
    }
    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="bottom-title">
                                <h2>My listings</h2>
                            </div>

                            <div className="rentals-content">
                               {myListings?.apartmentList?.length > 0 ? (

                                    <div className="apartmnets-container">
                                    {myListings.apartmentList.map((apartment, index) => (
                                    <div className="rental-card-wrapper" key={apartment.tokenId || index}>
                                    <div className="rental-card">
                                        <div className="rental-image">
                                            <img src={apartment.imageMain} alt={apartment.title} />
                                        </div>   

                                        <div className="rental-information">
                                            <p className="rental-name">{apartment.title}</p>
                                            <p>{apartment.city}</p>
                                            <div className="check"> 
                                                <p>Check-in: {apartment.checkInFrom>="00:00" && apartment.checkInFrom <= "11:59" ? apartment.checkInFrom + " AM" : apartment.checkInFrom + " PM"}  -  {apartment.checkInUntil>="00:00" && apartment.checkInUntil <= "11:59" ? apartment.checkInUntil + " AM" : apartment.checkInUntil + " PM"}
                                                </p>
                                            </div>

                                            <div className="check"> 
                                                <p>Check-out: {apartment.checkOutFrom>="00:00" && apartment.checkOutFrom <= "11:59" ? apartment.checkOutFrom + " AM" : apartment.checkOutFrom + " PM"} - {apartment.checkOutUntil>="00:00" && apartment.checkOutUntil <= "11:59" ? apartment.checkOutUntil + " AM" : apartment.checkOutUntil + " PM"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="rental-price">
                                                <p>{apartment.pricePerNight}</p>
                                            </div>

                                            <button 
                                                    className="button-review"
                                                    onClick={() => handleDelistProperty(apartment)}>
                                                    Delist
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                    ))}
                                    </div>
                               ) : (
                                <div className="no-rentals">
                                    <img src="src\assets\suitcase.png" alt="No rentals" />
                                    <p>No rentals found.</p>
                                </div>    
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </div>   
    );
}


