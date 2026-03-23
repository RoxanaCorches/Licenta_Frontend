import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getApartmentById } from "../../services/backend/ApartmentService";
import { IoLocation } from "react-icons/io5";
import { RentalContext } from "../../hooks/RentalContext";
import { createRental } from "../../services/backend/RentalService";
import { TbChevronsDownLeft } from "react-icons/tb";
import { rentNftProperty } from "../../services/blockchain/MarketplaceService";

export default function ReserveForms() {
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [tokenId, setTokenId] = useState(null);

    const [data, setData] =useState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                checkIn: '', 
                checkOut:'', 
            });

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const walletAddress = localStorage.getItem("walletAddress");
    const {checkIn, checkOut, nrNights} = useContext(RentalContext);

    console.log(nrNights);

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
                console.log("Data from getApartmentById", data);
                setProperty(data);
                setTokenId(data.tokenId);
                console.log("Token id:", data.tokenId);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoProperty();
    }, [idApartment]);

    const userId = localStorage.getItem("userId"); 
    console.log(userId);

    const handleSubmitReserve = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);
    
            const {firstName, lastName, phoneNumber} = data;
            if(!firstName || !lastName  || !phoneNumber) {
                setError("You must complete all fields!");
                setLoading(false);
                return;
            }
    
            const infoRental = {
                firstName:data.firstName,
                lastName:data.lastName,
                phoneNumber:data.phoneNumber,
                startDate:checkIn.toISOString().split("T")[0],
                endDate:checkOut.toISOString().split("T")[0],
                totalPrice:nrNights * property.pricePerNight,
                userId:userId,
                apartmentId: idApartment,
                transactionHash: ''
            };
    
            try {
                console.log("Token id:", tokenId);

                //const startDate = checkIn.toISOString().split("T")[0];
                //const endDate = checkOut.toISOString().split("T")[0];
                
                const startDate = Math.floor(new Date(checkIn).getTime() / 1000);
                const endDate = Math.floor(new Date(checkOut).getTime() / 1000);
                console.log("StartDate:", startDate);
                console.log("EndDate:", endDate);


                const totalPriceInEth = nrNights * property.pricePerNight;
                console.log("totalPriceInEth:",totalPriceInEth);

                //const priceWei = ethers.utils.parseEther(totalPriceInEth.toString());

                //console.log("Price in wei:", priceWei);
                const tx = await rentNftProperty(tokenId, startDate, endDate, totalPriceInEth.toString());
                console.log("tx:", tx);

                infoRental.transactionHash = tx;
                console.log("transactionHash in db",infoRental.transactionHash);
                await createRental(infoRental);
              
                navigate("/properties");
            } catch(error) { 
                setError(`Error create rental: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
            

   

    if (loading) return <p>Se încarcă proprietățile...</p>;
    if (error) return <p>Eroare: {error}</p>;

    return(
        <form onSubmit={handleSubmitReserve}> 
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
                        <button type="button" className="botton-payment">Connect Wallet</button>
                        <p className="wallet-address">Wallet Address: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
                    </div>

                    <div className="form-group">
                        <p className="eth-payment">ETH Payment</p>
                        <p className="price">Total: {nrNights * property.pricePerNight} ETH</p>
                        <button type="button" className="botton-payment-eth">Pay with ETH</button>
                    </div>

                    
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(1)}>Previous</button>
                        <button type="submit" className="form-next-button" onClick={() => setStep(2)}>Finish</button>
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
                        <p>{checkIn?.toLocaleDateString()} </p>
                    </div>

                    <div className="info">
                        <p>Check-Out:</p>
                        <p>{checkOut?.toLocaleDateString()} </p>
                    </div>

                    <div className="info">
                        <p>Guests</p>
                        <p>{property.guests}</p>
                    </div>

                    <div className="info">
                        <p>Price details:</p>
                        <p>{nrNights} nights * {property.pricePerNight} ETH</p>
                    </div>

                    <div className="info"> 
                        <p>Total Price</p>
                        <p className="total-price">{nrNights * property.pricePerNight} ETH</p>
                    </div>
                </div>
            </div>

        </div>
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