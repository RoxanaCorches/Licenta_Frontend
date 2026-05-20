import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FormExistingProperty({data, completeData}) {
    const [panelCheckInFrom, setPanelCheckInFrom] = useState(false);
    const [panelCheckInUntil, setPanelCheckInUntil] = useState(false);

    const [panelCheckOutFrom, setPanelCheckOutFrom] = useState(false);
    const [panelCheckOutUntil, setPanelCheckOutUntil] = useState(false);

    
    const dropdownPanelCheckInFrom = (e) => {
        e.preventDefault();
        setPanelCheckInFrom(!panelCheckInFrom);
    };

     const dropdownPanelCheckInUntil = (e) => {
        e.preventDefault();
        setPanelCheckInUntil(!panelCheckInUntil);
    };

     const dropdownPanelCheckOutFrom = (e) => {
        e.preventDefault();
        setPanelCheckOutFrom(!panelCheckOutFrom);
    };

     const dropdownPanelCheckOutUntil = (e) => {
        e.preventDefault();
        setPanelCheckOutUntil(!panelCheckOutUntil);
    };
        
        const handleChange = (e) => {
            const {name, type, value, checked} = e.target;
            completeData({[name]: type === "checkbox" ? checked : value});
        }
        
    return(
        <div className="form-section"> 
            <div className="area-price">
                <label className="form-label" htmlFor="listindescriptiongTitle">Price per night</label>
                <input
                    className="from-input" 
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    required
                    placeholder="Price per night"
                    min={0}
                />
            </div>

                    <div className="form-section-options-checks"> 
                        <div className="check-in"> 
                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Check-in From</label>
                                        <div className="input-box" onClick = {dropdownPanelCheckInFrom}> 
                                            <span>{data.hourCheckInFrom}</span>
                                            <span > <FaChevronDown /> </span>
                                        </div>

                                    {panelCheckInFrom && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                                return(
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckInFrom: hour});
                                                        setPanelCheckInFrom(false);
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
                                            <span>{data.hourCheckInUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                    {panelCheckInUntil && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckInUntil: hour});
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

                        <div className="check-out"> 
                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Check-out From</label>
                                        <div className="input-box" onClick = {dropdownPanelCheckOutFrom}> 
                                            <span>{data.hourCheckOutFrom}</span>
                                            <span > <FaChevronDown /> </span>
                                        </div>

                                    {panelCheckOutFrom && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    <li key={index}
                                                        onClick={() =>{ 
                                                        completeData({hourCheckOutFrom: hour});
                                                        setPanelCheckOutFrom(false);
                                                    }}
                                                    >
                                                    {hour}
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                 </div>

                            
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Until </label>
                                        <div className="input-box" onClick = {dropdownPanelCheckOutUntil}> 
                                            <span>{data.hourCheckOutUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                    {panelCheckOutUntil && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckOutUntil: hour});
                                                        setPanelCheckOutUntil(false);
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
                    </div>
            </div>
    );
}



/*

import { useState } from "react";
import BasicInfo from "../components/listProperty/BasicInfo";
import Location from "../components/listProperty/Location";
import PropertyDetails from "../components/listProperty/PropertyDetails";
import Facilities from "../components/listProperty/Facilities";
import HouseRules from "../components/listProperty/HouseRules";
import UploadImages from "../components/listProperty/UploadImages";
import { createApartment } from "../services/backend/ApartmentService";
import { useNavigate } from "react-router-dom";
import { approveMarketplace } from "../services/blockchain/PropertyNftService";
import { listNftProperty } from "../services/blockchain/MarketplaceService";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { ethers } from "ethers";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";

export default function ListExistingPropertyPage() {
    const [step, setStep] = useState(1);
    const [statusBlockchain, setStatusBlockchain] = useState("start");

    const [data, setData] = useState({
            price: '',
            hourCheckInFrom: "15:00",
            hourCheckInUntil: "18:00",
            hourCheckOutFrom: "10:00",
            hourCheckOutUntil: "13:00",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const information = (data) => {
        setData(prev => ({...prev, ...data}));
    };

    const handleTryAgain =  () => {
        navigate(`/listExistingProperty`);
    }
    
    const convertHours = (checkInFrom) => {
        const hoursForCheckIn = parseInt(checkInFrom.split(":")[0]);
        return hoursForCheckIn;
    }

    const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);

            try{
                const walletAddress = localStorage.getItem("walletAddress");
                console.log(walletAddress);

                const addInfoApartment = {
                    pricePerNight: Number(data.price),
                    checkInFrom: data.hourCheckInFrom,
                    checkInUntil: data.hourCheckInUntil,
                    checkOutFrom: data.hourCheckOutFrom,
                    checkOutUntil: data.hourCheckOutUntil,
                };
                await createApartment(addInfoApartment, []);
                const priceWei = ethers.utils.parseEther(String(data.price || "0"));
                //const checkInHour = Number(data.hourCheckInFrom.split(":")[0]);

                //const hoursForCheckIn = convertHours(data.hourCheckInUntil, data.hourCheckInFrom);

                const hoursIn = convertHours(data.hourCheckInFrom);
                const hoursOut = convertHours(data.hourCheckInUntil);
                console.log("HoursIn:", hoursIn);
                console.log("HoursOut:", hoursOut);

                //const hoursCheckIn = hoursForCheckIn * 3600;
                //console.log("Hours for chech-in for blockchain:", hoursCheckIn);
                

                //console.log("Hours for check-in:", hoursForCheckIn); 


                console.log("Approving marketplace...");

                setStatusBlockchain("approve_wallet");
                const txApprove  =  await approveMarketplace();; 
                setStatusBlockchain("approving_wallet");

                await new Promise(r => setTimeout(r, 2000));

                await txApprove.wait();

                console.log("Marketplace approved.");

                setStatusBlockchain("list_nft");
                const  txList  = await listNftProperty(data.tokenId, priceWei, hoursIn, hoursOut);
                setStatusBlockchain("listing_nft");
                await new Promise(r => setTimeout(r, 2000));

                await txList.wait();
                

                setStatusBlockchain("success_nft");

                console.log("NFT listed successfully!");

                //alert("Apartment listed!");

                setTimeout(() => {
                     navigate("/myListings");
                }, 5000);

            } catch (error) {
                console.error("Error in handleSubmit:", error);
                setError(`Error create apartment: ${error.message}`);
                alert(`Error: ${error.message}`);
                setStatusBlockchain("error_nft");
            } finally {
                setLoading(false);
            }
        }

    return(
        <form>  
        {error && <div className="error-info">
            <IoMdWarning className="icon-error"/> 
            <p className="description-error">{error}!</p>
        </div>
        }

       
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 2: Where is your Property?</h1>
                    <Location 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(1)}
                        nextStep={() => setStep(3)}
                    />
                    <div className="form-buttons">
                        <button 
                            type="button" 
                            className="form-next-button" 
                            onClick={handleSubmit}
                            disabled={loading}    
                        >
                            {loading ?
                            (
                                <div className="spinner">
                                    <ClipLoader loading={loading} size={40} />
                                </div>
                            ) : "Listing"}
                        </button>
                    </div>
                </div>
            </div>
      

        
       

       


        {statusBlockchain === "mint_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <FaCoins className="icon-reservation-status hourglass"/>
                        <h2>Create Property NFT</h2>
                        <p>Please confirm the transaction in your wallet to create your property NFT!</p>
                    </div>
            </div>
        )}


        {statusBlockchain === "minting_nft" && (
            <div className="edit-container">
                <div className="modal-reservation">
                    <LuHourglass className="icon-reservation-status hourglass"/>
                        <h2>Creating Property NFT...</h2>
                        <p>Your property NFT is being created on the blockchain.</p>
                    </div>
            </div>
        )}

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
                        type="botton"
                        onClick = {() => handleTryAgain()}
                    >
                        Try again
        
                    </button>
                </div>
            </div>
        )}
        </form>
    );
}
*/