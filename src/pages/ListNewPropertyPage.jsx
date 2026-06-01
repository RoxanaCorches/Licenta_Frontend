import { useState } from "react";
import BasicInfo from "../components/listProperty/BasicInfo";
import Location from "../components/listProperty/Location";
import PropertyDetails from "../components/listProperty/PropertyDetails";
import Facilities from "../components/listProperty/Facilities";
import HouseRules from "../components/listProperty/HouseRules";
import UploadImages from "../components/listProperty/UploadImages";
import { convertPriceApartment, createApartment } from "../services/backend/ApartmentService";
import { useNavigate } from "react-router-dom";
import { approveMarketplace, mintNftProperty } from "../services/blockchain/PropertyNftService";
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
export default function ListNewPropertyPage() {
    const [step, setStep] = useState(1);
    const [statusBlockchain, setStatusBlockchain] = useState("start");

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
            pet: null,
            smoking: null,
            parties: null,
            hourCheckInFrom: "15:00",
            hourCheckInUntil: "18:00",
            hourCheckOutFrom: "10:00",
            hourCheckOutUntil: "13:00",
            mainImage: null,
            otherImage: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const information = (data) => {
        setData(prev => ({...prev, ...data}));
    };

    const handleTryAgain =  () => {
        navigate(`/listNewProperty`);
    }
    
    const convertHours = (checkInFrom) => {
        const hoursForCheckIn = parseInt(checkInFrom.split(":")[0]);
        return hoursForCheckIn;
    }

    const handleSubmit = async (e) => {
        let receipt = null;
        let tokenId = null; 
        try{
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);

            
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
                  try {
                    setStatusBlockchain("mint_nft");
                    //const { tokenId } = await mintNftProperty(metadataUrl);
                    const  txMint  = await mintNftProperty(metadataUrl);
                    setStatusBlockchain("minting_nft");

                    await new Promise(r => setTimeout(r, 100));

                     receipt = await txMint.wait();
               } catch(errorMint) {
                    console.log(errorMint);
                    setStatusBlockchain("error_nft");
                    setLoading(false);
               }
                
               try{
                    
                    console.log("Events:", receipt.events);
                    for (const event of receipt.events || []) {
                        if (event.event === "Minted") {
                            tokenId = event.args.tokenId;
                            break;
                        }
                    }

                    if (!tokenId) throw new Error("Nu am găsit tokenId în event-ul Minted");

                    //alert("NFT property minted!");
                    console.log("Apartment created, tokenId:", tokenId, "Metadata URL:", metadataUrl);

                    const saveApartmentComplet = {
                        ...addInfoApartment, metadataUrl, tokenId: tokenId?.toString(), idApartment: idApartment,
                    };

                    await createApartment(saveApartmentComplet, images);
                } catch(error) {
                    console.log(error);
                }

                const priceEurEth = await convertPriceApartment(data.price);
                console.log("Price in eur and eth:", priceEurEth);
                console.log("Price in eur:", priceEurEth.eurPrice);
                console.log("Price in eth:", priceEurEth.ethPrice);

                const priceWei = ethers.utils.parseEther(String(priceEurEth.ethPrice || "0"));
                //const checkInHour = Number(data.hourCheckInFrom.split(":")[0]);

                //const hoursForCheckIn = convertHours(data.hourCheckInUntil, data.hourCheckInFrom);

                const hoursIn = convertHours(data.hourCheckInFrom);
                const hoursOut = convertHours(data.hourCheckInUntil);
                console.log("HoursIn:", hoursIn);
                console.log("HoursOut:", hoursOut);

                //const hoursCheckIn = hoursForCheckIn * 3600;
                //console.log("Hours for chech-in for blockchain:", hoursCheckIn);
                

                //console.log("Hours for check-in:", hoursForCheckIn); 

                console.log("tokenId:", tokenId.toString?.() ?? String(tokenId));
                console.log("priceWei:", priceWei.toString());

                try{
                    console.log("Approving marketplace...");

                    setStatusBlockchain("approve_wallet");
                    const txApprove  =  await approveMarketplace();; 
                    setStatusBlockchain("approving_wallet");

                    await new Promise(r => setTimeout(r, 2000));

                    await txApprove.wait();

                    console.log("Marketplace approved.");

                } catch(approveError) {
                    console.log("Approve failed:", approveError);
                    alert("Approve failed!");
                    setTimeout(() => {
                        navigate("/listExistingProperty", { replace: true });
                    }, 2000);
                    return;
                }

                try{
                    setStatusBlockchain("list_nft");
                    const  txList  = await listNftProperty(tokenId, priceWei, hoursIn, hoursOut);
                    setStatusBlockchain("listing_nft");

                    await new Promise(r => setTimeout(r, 2000));

                    await txList.wait();

                    setStatusBlockchain("success_nft");

                    console.log("NFT listed successfully!");

                    setTimeout(() => {
                        navigate("/myListings");
                    }, 5000);

                } catch (listError) {
                    console.log("Error to list nft!", listError);
                    alert("Error to list nft!");
                    setTimeout(() => {
                        navigate("/listExistingProperty", { replace: true });
                    }, 2000);
                    return;
                }

            }catch (error) {
                    console.error("Error in handleSubmit:", error);
                    
                    //alert(`Error: ${error.message}`);
                    setStatusBlockchain("error_nft");
                } finally {
                    setLoading(false);
                }
        }

        const isValidListing = data.mainImage !== null &&
                                data.otherImage.length >= 2;
                                
    return(
        <form>  
        {error && <div className="error-info">
            <IoMdWarning className="icon-error"/> 
            <p className="description-error">{error}!</p>
        </div>
        }

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
                            disabled={!isValidListing}    
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