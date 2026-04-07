import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { getUserById } from "../services/backend/UsersService";
import { delistNftProperty } from "../services/blockchain/MarketplaceService";
import { deleteApartment } from "../services/backend/ApartmentService";
import { IoLocation } from "react-icons/io5";
import { useWallet } from "../hooks/WalletContext";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyListingsPage() {
    const [myListings, setMyListings] = useState(null);
    const [nrListings, setNrListings] = useState(3);

    const [statusBlockchain, setStatusBlockchain] = useState("idle");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //const idUser = localStorage.getItem("idUserConnected");
    const navigate = useNavigate();
    const { account } = useWallet();

    useEffect(() => {
        const loadInfoUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(account);
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
    }, [account]);

     const handleTryAgain =  () => {
        //console.log("Da");
        setTimeout(() => {
            setStatusBlockchain("idle");
        }, 2000);
    }

    const handleDelistProperty = async (apartment) => {
            console.log("Delete apartment:", apartment);
            const {idApartment, tokenId } = apartment;

            if (!idApartment || !tokenId) {
                console.error("Invalid apartment info!", apartment);
                return;
            } 
            console.log("Delete apartment:", idApartment, tokenId );

            try {
                setStatusBlockchain("delist_nft");
                

                const txDelist = await delistNftProperty(tokenId);
                setStatusBlockchain("delisting_nft");

                await new Promise(r => setTimeout(r, 2000));

                await txDelist.wait();

                console.log("Delist from marketplace");
                await deleteApartment(idApartment);

                console.log("Delete form database");
              
                setMyListings((prev) => ({
                    ...prev, 
                    apartmentList: prev.apartmentList.filter(
                        (apartment) => apartment.idApartment !== idApartment
                    ),}
                ));

                setStatusBlockchain("success_nft");
                setTimeout(() => {
                     navigate("/myListings");
                    setStatusBlockchain("idle");
                }, 2000);
                //alert("Apartment deleted!")

            }catch(err){
                console.log(err);
                setStatusBlockchain("error_delist_nft");
            }
    }

    function convertTime(time) {
        const [hours, minutes] = time.split(":");
        let hour = parseInt(hours, 10);
        const amPm = hour < 12 ? "AM" : "PM";
       
        return `${hour}:${minutes} ${amPm}`;
    }

     if(error){
        return <div>{error}</div>
    }

     if(loading){
        return <div>{loading}</div>
    }
    
    return (
        <div>
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
                                    {myListings.apartmentList.slice(0, nrListings).map((apartment, index) => (
                                    <div className="rental-card-wrapper" key={apartment.tokenId || index}>
                                        <div className="rental-card">
                                            <div className="rental-image">
                                                <img src={apartment.imageMain} alt={apartment.title} />
                                            </div>   

                                            <div className="rental-information">
                                                <p className="rental-name">{apartment.title}</p>
                                                <div className="location">
                                                    <IoLocation className="icon-location"/>

                                                    <p>{apartment.street}, {apartment.city}, {apartment.country}</p>
                                                </div>
                                                <div className="check"> 
                                                    <p>Check-in: {convertTime(apartment.checkInFrom)} - {convertTime(apartment.checkInUntil)} </p>
                                                </div>

                                                <div className="check"> 
                                                    <p>Check-out: {convertTime(apartment.checkOutFrom)} - {convertTime(apartment.checkOutUntil)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="rental-price">
                                                    <p>{apartment.pricePerNight} ETH</p>
                                                </div>

                                                <button 
                                                        className="button-delist"
                                                        onClick={() => handleDelistProperty(apartment)}>
                                                        Delist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    ))}

                                    <div className="button-load-results">
                                        {nrListings < myListings.apartmentList.length ? (
                                            <button
                                                className="button-load-more"
                                                onClick={() => setNrListings(prev => prev + 3)}
                                            >
                                                View more results
                                            </button>
                                        ) : (
                                            
                                            <p>End of listings list.</p>
                                        )}
                                    </div>

                                </div>
                               ) : (
                                <div className="no-rentals">
                                    <img src="src\assets\suitcase.png" alt="No rentals" />
                                    <p>No listings found.</p>
                                </div>    
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {statusBlockchain === "delist_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaCoins className="icon-reservation-status hourglass"/>
                    <h2>Delist Property NFT</h2>
                    <p>Please confirm the transaction in your wallet to delist your property NFT!</p>
                </div>
            </div>
        )}
        
        
        {statusBlockchain === "delisting_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <LuHourglass className="icon-reservation-status hourglass"/>
                    <h2>Delisting Property NFT...</h2>
                    <p>Your property NFT is being delisting from marketplace</p>
                </div>
            </div>
        )}


        {statusBlockchain === "success_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaRegCheckCircle className="icon-reservation-status confirmed"/>
                    <h2>Property Delisted Successfully!</h2>
                    <p>Your property NFT has been successfully delisted from the marketplace.</p>
                </div>
            </div>
        )}
        
        {statusBlockchain === "error_delist_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <IoMdCloseCircle  className="icon-reservation-status canceled"/>
                    <h2>Something went wrong...</h2>
                    <button 
                            className="try-again"
                            type="button"
                            onClick = {() => handleTryAgain()}
                        >
                        Try again
                        </button>
                </div>
            </div>
        )}
     </div>   
    );
}


