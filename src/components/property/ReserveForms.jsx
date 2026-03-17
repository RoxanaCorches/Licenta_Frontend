import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApartmentById } from "../../services/backend/ApartmentService";

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
                        <img src="../../assets/4.jpg" alt="Image" />
                    </div>

                    <div className="title">
                        <h2>{property.title}</h2>
                        <p>{property.street}, {property.city}, {property.country}</p>
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
                        <p>nr_nopti * {property.pricePerNight}</p>
                    </div>

                    <div className="info"> 
                        <p>Total Price:</p>
                        <p className="total-price">733$</p>
                    </div>
                </div>
            </div>

        </div>
    );
}