import { useEffect, useState } from "react";
import Sidebar from "../components/listProperty/SideBar";
import { checkIsListed, listNftProperty } from "../services/blockchain/MarketplaceService";
import { IoLocation } from "react-icons/io5";
import { useWallet } from "../hooks/WalletContext";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";
import { FaLockOpen } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { getUserById } from "../services/backend/UsersService";
import { ethers } from "ethers";
import { approveMarketplace } from "../services/blockchain/PropertyNftService";
import { convertPriceApartment, updatePriceAndHoursApartment } from "../services/backend/ApartmentService";


export default function ListExistingPropertyPage() {
    const [myProperties, setMyProperties] = useState([]);
    const [nrListings, setNrListings] = useState(3);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedTokenId, setSelectedTokenId] = useState(null);

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

    const openModal = (apartment) => {
        setSelectedProperty(apartment);
        setEditData({
            
            checkInFrom: apartment.checkInFrom,
            checkInUntil: apartment.checkInUntil,
            
        });
    setEditInfo(true);
    };

    const [editData, setEditData] = useState({
        checkInFrom: "",
        checkInUntil: "",
    })

     const convertHours = (checkInFrom) => {
        const hoursForCheckIn = parseInt(checkInFrom?.split(":")[0]);
        return hoursForCheckIn;
    }

   useEffect(() => {
    if (!account) return;

    const showCreatedProperties = async () => {
        try {
            setLoading(true);

            const data = await getUserById(account);

            console.log("Show properties list", data.apartmentList);

            const properties = data.apartmentList || [];

            const propertiesCreated = [];

            for (const property of properties) {
                if (!property.tokenId) {
                    continue;
                }

                const nftIsListed = await checkIsListed(property.tokenId);

                console.log("tokenId:", property.tokenId, "isListed:", nftIsListed);

                if (!nftIsListed) {
                    propertiesCreated.push(property);
                }
            }

            setMyProperties(propertiesCreated);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    showCreatedProperties();
}, [account]);

     const handleTryAgain =  () => {
        setTimeout(() => {
            setStatusBlockchain("idle");
        }, 2000);
    }


    const handleUpdate = async (apartment) => {
        const { idApartment, tokenId } = apartment;

        if (!idApartment || !tokenId) {
            console.error("Invalid apartment info!", apartment);
            return null;
        }

        try {
            await updatePriceAndHoursApartment(idApartment, {
            pricePerNight: Number(newPrice),
            checkInFrom: editData.checkInFrom,
            checkInUntil: editData.checkInUntil,
        });

            const updatedApartment = {
                ...apartment, 
                ...{
                    pricePerNight: Number(newPrice),
                    checkInFrom: editData.checkInFrom,
                    checkInUntil: editData.checkInUntil,
                }
            };

            setMyProperties((prev) => {
                const safePrev = Array.isArray(prev) ? prev : [];

                return safePrev.map((item) =>
                    String(item.tokenId) === String(tokenId)
                        ? updatedApartment
                        : item
                );
            });

            return updatedApartment;
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    const handleListProperty = async (apartment) => {
        try{
            setLoading(true);
            setSelectedTokenId(apartment.tokenId);
            const updatedApartment = await handleUpdate(apartment);

            if (!updatedApartment) {
                alert("Update failed!");
                setLoading(false);
                setSelectedTokenId(null);
                return;
            }

            const priceEurEth = await convertPriceApartment(newPrice);
            console.log("Price in eur and eth:", priceEurEth);
            console.log("Price in eur:", priceEurEth.eurPrice);
            console.log("Price in eth:", priceEurEth.ethPrice);
                        
            const priceWei = ethers.utils.parseEther(String(priceEurEth.ethPrice || "0"));
            console.log("priceWei:", priceWei.toString());

                const hoursIn = convertHours(editData.checkInFrom);
                const hoursOut = convertHours(editData?.checkInUntil);
                console.log("HoursIn:", hoursIn);
                console.log("HoursOut:", hoursOut);

                console.log("tokenId:", apartment.tokenId.toString?.() ?? String(apartment.tokenId));
                console.log("Approving marketplace...");

                try{
                    setStatusBlockchain("approve_wallet");
                    const txApprove  =  await approveMarketplace();
                
                    setStatusBlockchain("approving_wallet");

                    await new Promise(r => setTimeout(r, 2000));

                    await txApprove.wait();

                    console.log("Marketplace approved.");
                } catch(approveError) {
                    console.log(approveError);
                    //alert("Approve failed!");
                    setStatusBlockchain("error_nft");
                    setEditInfo(false);
                    setSelectedProperty(null);
                    setSelectedTokenId(null);
                    setLoading(false);
                    setNewPrice("");
                    return;
                }

                try{
                    setStatusBlockchain("list_nft");
                    const  txList  = await listNftProperty(apartment.tokenId, priceWei, hoursIn, hoursOut);
                    setStatusBlockchain("listing_nft");
                    await new Promise(r => setTimeout(r, 2000));

                    await txList.wait();

                    setStatusBlockchain("success_nft");

                    console.log("NFT listed successfully!");

                    setMyProperties((prev) => {
                        const safePrev = Array.isArray(prev) ? prev : [];

                        return safePrev.filter(
                            (item) => String(item.tokenId) !== String(apartment.tokenId)
                        );
                    });

                setTimeout(() => {
                    navigate("/myListings", { replace: true });
                }, 2000);

            } catch(listError) {
                console.log(listError);
                alert("Listing failed!");
                setStatusBlockchain("error_nft");
                setEditInfo(false);
                setSelectedProperty(null);
                setSelectedTokenId(null);
                setLoading(false);
                setNewPrice("");
                return;
            }
        } catch (error) {
                console.error("Error in handleSubmit:", error);
                setError(`Error create apartment: ${error.message}`);
                alert(`Error: ${error.message}`);
                setStatusBlockchain("error_nft");
            } finally {
                setLoading(false);
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

    return (
        <div>
            <div className="wrapper-yourAccount">
              
                <div className="main-container">
                    <div className="bottom">
                        <div >
                            <div className="bottom-title">
                                <h2>My properties</h2>
                            </div>

                            <div className="rentals-content">
                               {myProperties?.length > 0 ? (
                                    <div className="apartmnets-container">
                                    {myProperties?.slice(0, nrListings).map((apartment, index) => (
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
                                                <p className="rental-price">{apartment.pricePerNight ?? ""} EUR</p>
                                                    <div className="buttons-status">
                                                        <div className="buttons-status-rentals"> 
                                                               <button 
                                                                    disabled={selectedTokenId === apartment.tokenId}
                                                                    className="button-review"
                                                                    onClick={() => {
                                                                        setEditInfo(true);
                                                                        setSelectedProperty(apartment);
                                                                        openModal(apartment);
                                                                    }}    
                                                                >
                                                                   {selectedTokenId === apartment.tokenId ? "Listing..." : "List"}
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
                                                                onClick={() => handleListProperty(apartment)} 
                                                                disabled={selectedTokenId === apartment.tokenId}
                                                            >
                                                                 {selectedTokenId === apartment.tokenId ? 
                                                                    "Listing..."
                                                                    : 
                                                                     'List Property'
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
                                        {nrListings < myProperties?.length ? (
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
                                        <p>No properties found.</p>
                                    </div>    
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        {statusBlockchain === "approve_wallet" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaLockOpen className="icon-reservation-status hourglass"/>
                        <h2>Approve Marketplace</h2>
                        <p>Please confirm the transaction in your wallet so the marketplace can manage your NFT.</p>
                </div>
            </div>
        )}
        
        {statusBlockchain === "approving_wallet" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <LuHourglass className="icon-reservation-status hourglass"/>
                    <h2>Approving Marketplace...</h2>
                    <p>The approval transaction is being processed on the blockchain.</p>
                </div>
            </div>
        )}
        
        {statusBlockchain === "list_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <MdOutlineSell className="icon-reservation-status hourglass"/>
                        <h2>List Property</h2>
                        <p>Please confirm the listing transaction in your wallet to make your property available.</p>
                </div>
            </div>
        )}
        
        {statusBlockchain === "listing_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <LuHourglass  className="icon-reservation-status hourglass"/>
                    <h2>Listing Property...</h2>
                    <p>The listing transaction is being confirmed on the blockchain.</p>
                </div>
            </div>
        )}

        {statusBlockchain === "success_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaRegCheckCircle className="icon-reservation-status confirmed"/>
                    <h2>Property Listed Successfully!</h2>
                    <p>Your property NFT has been successfully listed on the marketplace.</p>
                </div>
            </div>
        )}

        {statusBlockchain === "error_nft" && (
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
