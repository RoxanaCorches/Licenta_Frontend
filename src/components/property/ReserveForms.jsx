import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getApartmentById } from "../../services/backend/ApartmentService";
import { IoLocation } from "react-icons/io5";
import { RentalContext } from "../../hooks/RentalContext";
import { createRental } from "../../services/backend/RentalService";
import { rentNftProperty, verifyAvailability } from "../../services/blockchain/MarketplaceService";
import { useWallet, WalletContext } from "../../hooks/WalletContext";
import { getUserById } from "../../services/backend/UsersService";
import { FaHourglassHalf } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { LuHourglass } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { IoMdWarning } from "react-icons/io";
import { MdOutlineSell } from "react-icons/md";

export default function ReserveForms() {
    const navigate = useNavigate();

    const { connectWallet }  = useContext(WalletContext) ;
    const { account } = useWallet();
    const { checkIn, checkOut, setCheckIn, setCheckOut, nrNights } = useContext(RentalContext);
    const { idApartment } = useParams();

    const [property, setProperty] = useState(null);
    const [tokenId, setTokenId] = useState(null);
    
    const [rentalConfirmed, setRentalConfirmed] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //const [blockchainStatus, setBlockchainStatus] = useState("idle");


    const [data, setData] = useState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                checkIn: '', 
                checkOut:'', 
            });

    
    const walletAddress = localStorage.getItem("walletAddress");
    console.log("nrNights:", nrNights);

    const handleChange = (e) => {
            const { name, value} = e.target;
            setData(prev => ({...prev, [name]: value}));
    };

   
    console.log("Id apartment:" + idApartment)
    
    useEffect(() => {
        const loadInfoProperty = async () => {
            try {
                setLoading(true);
                const data = await getApartmentById(idApartment);
                console.log("Data from getApartmentById", data);
                setProperty(data);
                setTokenId(data.tokenId);
                console.log("Token id:", data.tokenId);
                console.log(data.checkInFrom);
                console.log(data.checkInUntil);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoProperty();
    }, [idApartment]);

    //const userId = localStorage.getItem("userId"); 
    //console.log("Id ul user ului care vrea sa rezerve", userId);
    const handleTryAgain =  (idApartment) => {
        navigate(`/properties/property/${idApartment}`);
    }

    const handleSubmitReserve = async (e) => {
            e.preventDefault();
            setError('');
            setProcessingPayment(true);
            //setLoading(true);
            console.log("Form:", data);

            try {
                const dataUser = await getUserById(account);
                    if (!dataUser || !dataUser.idUser) {
                        setError("User not found for this wallet!");
                            return;
                    }
                const idUser = dataUser.idUser;
                console.log("Id ul user ului care vrea sa rezerve", idUser);
        
                const {firstName, lastName, phoneNumber} = data;
                if(!firstName || !lastName  || !phoneNumber) {
                    setError("You must complete all fields!");
                    setProcessingPayment(true);
                    return;
                }
        // 1777755600     1777766400
                const infoRental = {
                    firstName:data.firstName,
                    lastName:data.lastName,
                    phoneNumber:data.phoneNumber,
                    startDate: checkIn.toLocaleDateString('en-CA'),
                    endDate:checkOut.toLocaleDateString('en-CA'),
                    rentalDate: '',
                    totalPrice:nrNights * property.pricePerNight,
                    userId:idUser,
                    apartmentId: idApartment,
                    transactionHash: ''
                };
   
                console.log("Token id:", tokenId);

                

                //const startDate = checkIn.toISOString().split("T")[0];
                //const endDate = checkOut.toISOString().split("T")[0];

                console.log("checkIn:", checkIn);
                //console.log("check-in:",Math.floor(new Date(infoRental.startDate).getTime() / 1000) )
                
                const startDate = Math.floor(new Date(checkIn).getTime() / 1000);
                const endDate = Math.floor(new Date(checkOut).getTime() / 1000);
                

                console.log("StartDate:", startDate);
                console.log("EndDate:", endDate);

                const totalPriceInEth = nrNights * property.pricePerNight;
                console.log("totalPriceInEth:", totalPriceInEth);

                //const priceWei = ethers.utils.parseEther(totalPriceInEth.toString());

                const available = await verifyAvailability(tokenId, startDate, endDate);

                if (!available) {
                    setError("Perioada a fost rezervată între timp.");
                    setProcessingPayment(false);
                    return;
                }


                console.log("TOKEN ID sent to rent:", tokenId);
                console.log("START DATE sent to rent:", startDate);
                console.log("END DATE sent to rent:", endDate);

                console.log("Start local:", new Date(startDate * 1000).toString());
                console.log("End local:", new Date(endDate * 1000).toString());
                //setBlockchainStatus("book_property");
                const tx = await rentNftProperty(tokenId, startDate, endDate, totalPriceInEth.toString());
                console.log("tx:", tx);

                //setBlockchainStatus("booking_property");

                //await new Promise(r => setTimeout(r, 100));

                //await tx.wait();

                infoRental.transactionHash = tx.transactionHash;
                const createdRental = (tx.reservationDate).toISOString();
                infoRental.rentalDate = createdRental;

                console.log("Data la care a fost facuta rezervarea:", createdRental);
                console.log("transactionHash in db:", infoRental.transactionHash);
                await createRental(infoRental);

                //setBlockchainStatus("success_property");

                setRentalConfirmed(true);
                setProcessingPayment(false);
                setCheckIn("");
                setCheckOut("");
              
                setTimeout(() => {
                     navigate("/myRentals");
                }, 5000);
               
            } catch(error) { 
                setError(`${error.message}`);
                alert(error.message);
                setProcessingPayment(false);
                setCheckIn("");
                setCheckOut("");

                 //setBlockchainStatus("error_property");
            } finally {
                 setProcessingPayment(false);
            }
        }
         
    if (error) 
        return (
            <div className="error-info">
                <IoMdWarning className="icon-error"/> 
                <p className="description-error">{error}!</p>
            </div>
        );

    return(
        <form onSubmit={handleSubmitReserve}> 
        {loading ? (
                <div className="spinner">
                    <ClipLoader loading={loading} size={40} />
                </div>
        ): (

        <div className="container-reserve">
            {step === 1 && ( 
            <div className="contact-info"> 
                <h2>Contact information</h2>
                <div className="form-section"> 
                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="First Name"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Phone"
                        />
                    </div>
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-next-button" onClick={() => setStep(2)}>Next</button>
                </div>
            </div>
            )}

            {step === 2 && (
                <div className="contact-info"> 
                <h2>Payment Methods</h2>
                <div className="form-section"> 
                    <div className="form-group">
                        {!walletAddress ?  (<button 
                                                type="button" 
                                                className="button-payment-eth"
                                                onClick={connectWallet}
                                            >
                                                    Connect Wallet
                                </button>
                        ) : (
                            <p className="wallet-address">Wallet Address: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <p className="eth-payment">ETH Payment</p>
                        <p className="price">Total: {nrNights * property.pricePerNight} ETH</p>
                        <button 
                            type="submit" 
                            className="button-payment-eth"
                            disabled={loading || !walletAddress}
                        >
                            Pay with ETH
                        </button>
                    </div>

                    
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(1)}>Previous</button>
                    </div>
                </div>
            )}

            <div className="history-reservation">
                <div className="history-top">
                    <div className="image">
                        <img src={property?.imageMain} alt={property?.title} />
                    </div>

                    <div className="title-location">
                        <h2>{property?.title}</h2>
                        <div className="location">
                            <IoLocation className="icon-location"/>
                            <p>{property?.street}, {property?.city}, {property?.country}</p>
                        </div>
                    </div>
                </div>

                <div className="history-content">
                    <div className="info">
                        <p>Check-In:</p>
                        <p>{new Date(checkIn)?.toLocaleDateString()} </p>
                    </div>

                    <div className="info">
                        <p>Check-Out:</p>
                        <p>{new Date(checkOut)?.toLocaleDateString()} </p>
                    </div>

                    <div className="info">
                        <p>Guests</p>
                        <p>{property?.guests}</p>
                    </div>

                    <div className="info">
                        <p>Price details:</p>
                        <p>{nrNights} nights * {property?.pricePerNight} ETH</p>
                    </div>

                    <div className="info"> 
                        <p>Total Price</p>
                        <p className="total-price">{nrNights * property?.pricePerNight} ETH</p>
                    </div>
                </div>
            </div>


            {processingPayment && (
                <div className="edit-container">
                    <div className="modal-reservation">
                        <LuHourglass className="icon-reservation-status hourglass"/>
                        <h2>Processing Payment</h2>
                            <p>Please approve the transaction in your wallet.</p>
                    </div>
                </div>
            )} 

            {!processingPayment && error && !rentalConfirmed && (
                <div className="edit-container">
                    <div className="modal-reservation">
                        <IoMdCloseCircle  className="icon-reservation-status canceled"/>
                        <h2>Something went wrong...</h2>
                        <button 
                            className="try-again"
                            type="botton"
                            onClick = {() => handleTryAgain(property.idApartment)}
                        >
                            Try again

                        </button>
                    </div>
                </div>
            )}


            {!processingPayment && rentalConfirmed && (
                <div className="edit-container">
                    <div className="modal-reservation">
                        <FaRegCheckCircle className="icon-reservation-status confirmed"/>
                        <h2>Reservation Confirmed </h2>
                        <p>Your booking was successful.</p>
                    </div>
                </div>
            )}
        </div>
        )}
        </form>
       
    );
}







/*
export default function ReserveForms() {
    const [property, setProperty] = useState(null);
    const [data, setData] =useState({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            });

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const walletAddress = localStorage.getItem("walletAddress");
    const nrNights = localStorage.getItem("nrNights");

    const handleChange = (e) => {
            const { name, value} = e.target;
            setData(prev => ({...prev, [name]: value}));
        };

    const {idApartment} = useParams();
    console.log("Id apartment:" + idApartment)
    
    useEffect(() => {
        const loadInfoProperty = async () => {
            try {
                setLoading(true);
                const data = await getApartmentById(idApartment);
                setProperty(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoProperty();
    }, [idApartment]);

    const handleSubmitReserve = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);

            try{
                const walletAddress = localStorage.getItem("walletAddress");
                console.log(walletAddress);

                const addInfoUser = {
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    phone_nmber: phone_nmber
                };
            
               
                let response = await createApartment(addInfoApartment, images);
                const metadataUrl = response.metadataUrl;
                console.log("MetadataUrl:", metadataUrl);
                const idApartment = response.idApartment;

                const { tokenId } = await mintNftProperty(metadataUrl);
                alert("NFT property minted!");
                console.log("Apartment created, tokenId:", tokenId, "Metadata URL:", metadataUrl);

                const saveApartmentComplet = {
                    ...addInfoApartment, metadataUrl, tokenId: tokenId.toString(), idApartment: idApartment,
                };

                await createApartment(saveApartmentComplet, images);
                


            
                const priceWei = ethers.utils.parseEther(String(data.price || "0"));
                const checkInHour = Number(data.hourCheckInFrom.split(":")[0]);

                console.log("tokenId:", tokenId.toString?.() ?? String(tokenId));
                console.log("priceWei:", priceWei.toString());
                console.log("Check-in hour:", checkInHour);

                
               
                

            


                // --- List NFT on marketplace ---
                console.log("Approving marketplace...");
                await approveMarketplace(); // așteaptă confirmarea
                console.log("Marketplace approved.");
                await listNftProperty(tokenId, priceWei, checkInHour);
                console.log("NFT listed successfully!");

                alert("Apartment listed!");
                navigate("/properties");

            } catch (error) {
                console.error("Error in handleSubmit:", error);
                setError(`Error create apartment: ${error.message}`);
                alert(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

     if (loading) return <p>Se încarcă proprietățile...</p>;
    if (error) return <p>Eroare: {error}</p>;

    return(
        <div className="container-reserve">
            {step === 1 && ( 
            <div className="contact-info"> 
                <h2>Contact information</h2>
                <div className="form-section"> 
                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="First Name"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Email"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            className="from-input" 
                            type="text"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Phone"
                        />
                    </div>
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-next-button" onClick={() => setStep(2)}>Next</button>
                </div>
            </div>
            )}

            {step === 2 && (
                <div className="contact-info"> 
                <h2>Payment Methods</h2>
                <div className="form-section"> 
                    

                    <div className="form-group">
                        <button type="button" className="botton-payment">Connect Wallet</button>
                        <p className="wallet-address">Wallet Address: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
                    </div>

                    <div className="form-group">
                        <p className="eth-payment">ETH Payment</p>
                        <p className="price">Total: ... ETH</p>
                        <button type="button" className="botton-payment-eth">Pay with ETH</button>
                    </div>

                    
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(1)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(2)}>Finish</button>
                    </div>
                </div>
            )}
            <div className="history-reservation">
                <div className="history-top">
                    <div className="image">
                        <img src={property.imageMain} alt={property.title} />
                    </div>

                    <div className="title-location">
                        <h2>{property.title}</h2>
                        <div className="location">
                            <IoLocation className="icon-location"/>
                            <p>{property.street}, {property.city}, {property.country}</p>
                        </div>
                    </div>
                </div>

                <div className="history-content">
                    <div className="info">
                        <p>Check-In:</p>
                         <p>Check-Out:</p>
                    </div>

                    <div className="info">
                        <p>Check-Out:</p>
                    </div>

                    <div className="info">
                        <p>Guests</p>
                        <p>{property.guests}</p>
                    </div>

                    <div className="info">
                        <p>Price details:</p>
                        <p>{nrNights} * {property.pricePerNight}</p>
                    </div>

                    <div className="info"> 
                        <p>Total Price:</p>
                        <p className="total-price"></p>
                    </div>
                </div>
            </div>

        </div>
    );
}
    */