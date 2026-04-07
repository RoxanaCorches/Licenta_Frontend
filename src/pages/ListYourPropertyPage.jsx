import { useState } from "react";
import BasicInfo from "../components/listProperty/BasicInfo";
import Location from "../components/listProperty/Location";
import PropertyDetails from "../components/listProperty/PropertyDetails";
import Facilities from "../components/listProperty/Facilities";
import HouseRules from "../components/listProperty/HouseRules";
import UploadImages from "../components/listProperty/UploadImages";
import { createApartment } from "../services/backend/ApartmentService";
import { useNavigate } from "react-router-dom";
import { approveMarketplace, mintNftProperty } from "../services/blockchain/PropertyNftService";
import { listNftProperty } from "../services/blockchain/MarketplaceService";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { FaCoins } from "react-icons/fa";
import { GiLockedFortress } from "react-icons/gi";
import { FaLockOpen } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { ethers } from "ethers";

export default function ListYourPropertyPage() {
    const [step, setStep] = useState(1);

    const [statusBlockchain, setStatusBlockchain] = useState("start");
    //const totalSteps = 5;
    //const progress = (step / totalSteps) * 100; 

    const [data, setData] = useState({
            propertyType: "apartment",
            listingTitle: '',
            description: '',
            area: '',
            price: '',
            country: '',
            numberFloor: '',
            street: '',
            city: '',
            zipCode:'',
            guests: 1,
            bedrooms:1,
            bathrooms:1,
            tv: false,
            wifi: false,
            kitchen:false,
            washer:false,
            airConditioning:false,
            pool:false,
            hotTub:false,
            bbqGrill:false,
            poolTable:false,
            indoorFireplace:false,
            piano:false,
            balcony:false,
            terrace:false,
            gardenView:false,
            skiOut:false,
            lakeAccess:false,
            beachAccess:false,
            pet: false,
            smoking: false,
            parties: false,
            hourCheckInFrom: "15:00",
            hourCheckInUntil: "18:00",
            hourCheckOutFrom: "10:00",
            hourCheckOutUntil: "13:00",
            mainImage: null,
            otherImage: [null, null, null, null]
            //mapLocation:''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const information = (data) => {
        setData(prev => ({...prev, ...data}));
    };

    const handleTryAgain =  () => {
        navigate(`/listYourProperty`);
    }
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);

            try{
                const images = [];
                if(data.mainImage)
                    images.push(data.mainImage);

                 data.otherImage.forEach(img => {
                if(img)
                    images.push(img);
                });

                const imageName = images.map(img => img.name);
                console.log("Images to upload:", images);

                const walletAddress = localStorage.getItem("walletAddress");
                console.log(walletAddress);

                const addInfoApartment = {
                    blockchainAddress: walletAddress,
                    title: data.listingTitle,
                    description: data.description,
                    area: Number(data.area),
                    pricePerNight: Number(data.price),
                    country: data.country,
                    floor: Number(data.numberFloor),
                    street: data.street,
                    city: data.city,
                    zipcode: Number(data.zipCode),
                    guests: data.guests,
                    bedrooms: data.bedrooms,
                    bathrooms: data.bathrooms,

                    tv: data.tv,
                    wifi: data.wifi,
                    kitchen: data.kitchen,
                    washer: data.washer,
                    airConditioning: data.airConditioning,
                    pool: data.pool,
                    hotTub: data.hotTub,
                    bbqGrill: data.bbqGrill,
                    poolTable: data.poolTable,
                    indoorFireplace: data.indoorFireplace,
                    piano: data.piano,
                    balcony: data.balcony,
                    terrace: data.terrace,
                    gardenView: data.gardenView,
                    skiOut: data.skiOut,
                    lakeAccess: data.lakeAccess,
                    beachAccess: data.beachAccess,
                    petsAllowed: data.pet === "petYes",
                    smokingAllowed: data.smoking === "smokingYes",
                    partiesAllowed: data.parties === "partiesYes",

                    checkInFrom: data.hourCheckInFrom,
                    checkInUntil: data.hourCheckInUntil,
                    checkOutFrom: data.hourCheckOutFrom,
                    checkOutUntil: data.hourCheckOutUntil,

                    imageMain: imageName[0],
                    image1: imageName[1],
                    image2: imageName[2],
                    image3: imageName[3],
                    image4: imageName[4],
                };
            
               
                let response = await createApartment(addInfoApartment, images);
                const metadataUrl = response.metadataUrl;
                console.log("MetadataUrl:", metadataUrl);
                const idApartment = response.idApartment;

                setStatusBlockchain("mint_nft");
                //const { tokenId } = await mintNftProperty(metadataUrl);
                const  txMint  = await mintNftProperty(metadataUrl);
                setStatusBlockchain("minting_nft");

                await new Promise(r => setTimeout(r, 100));

                const receipt = await txMint.wait();
                //console.log("Transaction confirmed:", receipt.transactionHash);

                // --- extrage tokenId din event-ul Minted ---
                
                let tokenId = null;
                console.log("Events:", receipt.events);
                for (const event of receipt.events) {
                    if (event.event === "Minted") {
                        tokenId = event.args.tokenId;
                        break;
                    }
                }
                //await txMint.wait();

                if (!tokenId) throw new Error("Nu am găsit tokenId în event-ul Minted");

                //alert("NFT property minted!");
                console.log("Apartment created, tokenId:", tokenId, "Metadata URL:", metadataUrl);

                const saveApartmentComplet = {
                    ...addInfoApartment, metadataUrl, tokenId: tokenId.toString(), idApartment: idApartment,
                };

                await createApartment(saveApartmentComplet, images);
                const priceWei = ethers.utils.parseEther(String(data.price || "0"));
                //const checkInHour = Number(data.hourCheckInFrom.split(":")[0]);

                const hoursForCheckIn = (Number(data.hourCheckInUntil.split(":")[0])) - (Number(data.hourCheckInFrom.split(":")[0]));

                const hoursCheckIn = hoursForCheckIn * 3600;
                console.log("Hours for chech-in for blockchain:", hoursCheckIn);
                

                console.log("Hours for check-in:", hoursForCheckIn); 

                console.log("tokenId:", tokenId.toString?.() ?? String(tokenId));
                console.log("priceWei:", priceWei.toString());

                // --- List NFT on marketplace ---
                console.log("Approving marketplace...");

                setStatusBlockchain("approve_wallet");
                // așteaptă confirmarea
                const txApprove  =  await approveMarketplace();; 
                setStatusBlockchain("approving_wallet");

                await new Promise(r => setTimeout(r, 2000));

                await txApprove.wait();

                console.log("Marketplace approved.");

                setStatusBlockchain("list_nft");
                const  txList  = await listNftProperty(tokenId, priceWei, hoursCheckIn);
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
        {error && <div className="kyc-error">{error}</div>}
        {step === 1 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 1: Basic Info</h1>
                    <BasicInfo
                        data={data}
                        completeData={information}
                        nextStep={() => setStep(2)}
                    />
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 2: Where is your Property?</h1>
                    <Location 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(1)}
                        nextStep={() => setStep(3)}
                    />
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 3: Share some basics about your place</h1>
                    <PropertyDetails 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(2)}
                        nextStep={() => setStep(4)}
                    />
                    
                </div>
            </div>
        )}

        {step === 4 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 4: Amenities & Facilities</h1>
                    <Facilities 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(3)}
                        nextStep={() => setStep(5)}
                    />
                    
                </div>
            </div>
        )}

        {step === 5 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 5: House Rules</h1>
                    <HouseRules 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(4)}
                        nextStep={() => setStep(6)}
                    />
                </div>
            </div>
        )}

        {step === 6 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 6: Upload Images</h1>
                    <UploadImages 
                        data={data}
                        completeData={information}
                        prevStep={() => setStep(5)}
                        nextStep={() => setStep(6)}
                    />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(5)}>Previous</button>
                        <button 
                            type="button" 
                            className="form-next-button" 
                            onClick={handleSubmit}
                            disabled={loading}    
                        >
                            {loading ? "Listing..." : "Listing"}
                        </button>
                    </div>
                </div>
            </div>
        )}


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
                        <p><LuHourglass />The listing transaction is being confirmed on the blockchain.</p>
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