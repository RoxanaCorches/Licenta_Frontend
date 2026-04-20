import { useEffect, useState } from "react";
import Sidebar from "../components/listProperty/SideBar";
import { getUserById } from "../services/backend/UsersService";
import { delistNftProperty, updatePriceAndHours } from "../services/blockchain/MarketplaceService";
import { deleteApartment, updatePriceAndHoursApartment } from "../services/backend/ApartmentService";
import { IoLocation } from "react-icons/io5";
import { useWallet } from "../hooks/WalletContext";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";

export default function MyListingsPage() {
    const [myListings, setMyListings] = useState([]);
    const [nrListings, setNrListings] = useState(3);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const [statusBlockchain, setStatusBlockchain] = useState("idle");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { account } = useWallet();

    const [editInfo, setEditInfo] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    const [panelCheckInFrom, setPanelCheckInFrom] = useState(false);
    const [panelCheckInUntil, setPanelCheckInUntil] = useState(false);

    
    const dropdownPanelCheckInFrom = (e) => {
        e.preventDefault();
        setPanelCheckInFrom(!panelCheckInFrom);
    };

     const dropdownPanelCheckInUntil = (e) => {
        e.preventDefault();
        setPanelCheckInUntil(!panelCheckInUntil);
    };

    const [editData, setEditData] = useState({
        checkInFrom: "",
        checkInUntil: "",
    })


    const openModal = (apartment) => {
        setSelectedProperty(apartment);
    setEditData({
        
        checkInFrom: apartment.checkInFrom,
        checkInUntil: apartment.checkInUntil,
        
    });
    console.log("CHECK IN FROM:", apartment.checkInFrom);

    setEditInfo(true);
    };

    

    useEffect(() => {
        if(!account) return;
        const loadInfoUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(account);
                setMyListings(data);
                console.log(myListings);
                console.log("Info:", data);
                console.log("My listings:", data.apartmentList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoUser();
    }, [account]);

     const handleTryAgain =  () => {
        setTimeout(() => {
            setStatusBlockchain("idle");
        }, 2000);
    }

    const handleUpdate = async() => {
        const {idApartment, tokenId } = selectedProperty;

        if (!idApartment || !tokenId) {
            console.error("Invalid apartment info!", selectedProperty);
            return;
        } 
        try {
            setStatusBlockchain("update_info");

            const hoursIn = parseInt(editData.checkInFrom.split(":")[0]);
            const hoursOut = parseInt(editData.checkInUntil.split(":")[0]);

            const txUpdate = await updatePriceAndHours(selectedProperty.tokenId, newPrice, hoursIn, hoursOut);
            
            console.log("editData.checkInFrom", editData.checkInFrom);
            console.log("editData.checkInUntil", editData.checkInUntil);
            
            console.log("hoursIn", hoursIn);
            console.log("hoursOut", hoursOut);

            setStatusBlockchain("updating_info");

            await new Promise(r => setTimeout(r, 2000));

            await txUpdate.wait();

            await updatePriceAndHoursApartment(idApartment, 
                {
                pricePerNight: Number(newPrice),
                checkInFrom: editData.checkInFrom,
                checkInUntil: editData.checkInUntil
            });

            const data = await getUserById(account);

            setMyListings(data);

            setStatusBlockchain("success_update_info");

            setNewPrice("");
            setEditInfo(false);

            setTimeout(() => {
                navigate("/myListings");
                setStatusBlockchain("idle");
            }, 2000);

        } catch(err){
            console.log(err);
            setStatusBlockchain("error_update_info");
            setNewPrice("");
            setEditInfo(false);
        }
    };

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

   
    if (error) {
        return (
            <div className="error-info">
                <IoMdWarning className="icon-error"/> 
                <p className="description-error">{error}!</p>
            </div>
        );
    }

     if(loading) {
        return (
            <div className="spinner">
                    <ClipLoader loading={loading} size={40} />
            </div>
        );
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
                               {myListings.apartmentList?.length > 0 ? (
                                    <div className="apartmnets-container">
                                    {myListings.apartmentList?.slice(0, nrListings).map((apartment, index) => (
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

                                            <div  className="rental-feedback">
                                                <p className="rental-price">{apartment.pricePerNight ?? ""} ETH</p>
                                                    <div className="buttons-status">
                                                        <div className="buttons-status-rentals"> 
                                                                <button 
                                                                    className="button-review"
                                                                    onClick={() => {
                                                                        setEditInfo(true);
                                                                        setSelectedProperty(apartment);
                                                                        openModal(apartment);
                                                                    }}    
                                                                >
                                                                    Update
                                                                </button>
                                                                <button 
                                                                    className="button-review"
                                                                    onClick={() => handleDelistProperty(apartment)}
                                                                >
                                                                    Delist
                                                                </button>
                                                        </div>
                                                    </div>
                                                </div> 

                                            {editInfo && (
                                                <div className="edit-container">
                                                    <div className="modal-edit">
                                                        <h2>Edit price per night and hours for check-in</h2>
                                                        <input
                                                            type="number"
                                                            placeholder="Price per night"
                                                            value={newPrice}
                                                            onChange={(e) => setNewPrice(e.target.value)}
                                                        />

                                                                <div className="check-in"> 
                                                                    <div className="container-checkIn-checkOut"> 
                                                                        <div className="checkin-from-until"> 
                                                                            <label className="form-label">Check-in From</label>
                                                                            <div className="input-box" onClick = {dropdownPanelCheckInFrom}> 
                                                                                <span>{convertTime(editData.checkInFrom)}</span>
                                                                                                                  
                                                                            </div>
                                                                      
                                                                            {panelCheckInFrom && (
                                                                                <ul className="search-panel-info-checks">
                                                                                    {Array.from({length:24}, (_, index) => {
                                                                                        const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                                      
                                                                                        return(
                                                                                            <li key={index}>
                                                                                            <span onClick={() =>{ 
                                                                                                setEditData(prev => ({
                                                                                                ...prev,
                                                                                                checkInFrom: hour
                                                                                                }));
                                                                                                setPanelCheckInFrom(false);                                                                                                                            setPanelCheckInFrom(false);
                                                                                            }}
                                                                                            >
                                                                                            {hour}
                                                                                            </span>
                                                                                            </li>
                                                                                        );
                                                                                    })}
                                                                                </ul>
                                                                            )}
                                                                        </div>

                                                                        <div className="checkin-from-until"> 
                                                                            <label className="form-label">Until </label>
                                                                                <div className="input-box" onClick = {dropdownPanelCheckInUntil}> 
                                                                                    <span>{convertTime(editData.checkInUntil)}</span>
                                                                                                    
                                                                                </div>
                                                                                {panelCheckInUntil && (
                                                                                    <ul className="search-panel-info-checks">
                                                                                        {Array.from({length:24}, (_, index) => {
                                                                                            const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                                                            return(
                                                                                                            
                                                                                                <li key={index}>
                                                                                                <span onClick={() =>{ 
                                                                                                    setEditData(prev => ({
                                                                                                        ...prev,
                                                                                                        checkInUntil: hour
                                                                                                    }));
                                                                                                setPanelCheckInUntil(false);
                                                                                                }}
                                                                                                >
                                                                                                    {hour}
                                                                                                </span>
                                                                                                </li>
                                                                                            );
                                                                                        })}
                                                                                    </ul>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                    
                                                        

                                                        <div className="modal-edit-buttons">
                                                            <button className="cancel" onClick={() => setEditInfo(false)}>
                                                                Cancel
                                                            </button>

                                                            <button  
                                                                className="submit" 
                                                                key={apartment.idApartment}
                                                                onClick={() => handleUpdate(apartment)} 
                                                                disabled={loading}
                                                            >
                                                                {loading ? 
                                                                    ( <div className="spinner">
                                                                            <ClipLoader loading={loading} size={40} />
                                                                        </div>
                                                                    ) : 'Submit'
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                               
                                            )}
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


        {statusBlockchain === "update_info" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaCoins className="icon-reservation-status hourglass"/>
                    <h2>Update Property NFT</h2>
                    <p>Please confirm the transaction in your wallet to update your property NFT!</p>
                </div>
            </div>
        )}
        
        
        {statusBlockchain === "updating_info" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <LuHourglass className="icon-reservation-status hourglass"/>
                    <h2>Updating Property NFT...</h2>
                    <p>Your property NFT is being updating on marketplace</p>
                </div>
            </div>
        )}


        {statusBlockchain === "success_update_info" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaRegCheckCircle className="icon-reservation-status confirmed"/>
                    <h2>Property Updated Successfully!</h2>
                    <p>Your property NFT has been successfully updated on the marketplace.</p>
                </div>
            </div>
        )}
        
        {statusBlockchain === "error_update_info" && (
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


