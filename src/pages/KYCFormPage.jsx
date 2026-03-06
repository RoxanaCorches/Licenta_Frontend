import { useState } from "react";
import Navbar from "../components/Navbar";
import { createUser } from "../services/UsersService";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export default function KYCFormPage() {
    const navigate = useNavigate();

    const [data, setData] =useState({
        username: '',
        firstName: '',
        lastName: '',
        birthday: '',
        phoneNumber: '',
        nationality:'',
        city: '',
        address: '',
        zipcode: '',
        blockchainAddress: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log("Form:", data);

        const { username, firstName, lastName, birthday, phoneNumber, nationality, city, address, zipcode, blockchainAddress} = data;
        if(!username || !firstName || !lastName || !birthday || !phoneNumber || !nationality || !city || !address || !zipcode || !blockchainAddress) {
            setError("You must complete all fields!");
            setLoading(false);
            return;
        }

        const infoUser = {
            username,
            firstName,
            lastName,
            birthday,
            phoneNumber,
            nationality,
            city,
            address,
            zipcode,
            blockchainAddress
        };

        try {
            await createUser(infoUser);
            alert("User created!");
            navigate("/properties");
        } catch(error) {
            setError(`Error create user: ${error.messge}`);
        } finally {
            setLoading(false);
        }
        }
    

     return(
       <div className="kyc-container">
        <Navbar />
        <div className="kyc-contents"> 
            <h1 className="kyc-title">
                Verify your identity to continue!
            </h1>
            <p>To list, delist, or rent apartments on our platform, identity verification (KYC) is required.
                This helps us keep the community safe and compliant with regulations.</p>
        </div>
            <div className="kyc-form-wrapper"> 
            <form onSubmit={handleSubmit} className="kyc-form">
                {error && <div className="kyc-error">{error}</div>}
                
                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="username">Username</label>
                   
                    <input
                        className="kyc-input" 
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your username"
                    />
                </div>
                
                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="firstName">First Name</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your first name"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your last name"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="birthday">Birthday</label>
                    <input
                        className="kyc-input" 
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={data.birthday}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your birthday"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="phoneNumber">Phone Number</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="nationality">Nationality</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={data.nationality}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your country name"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="city">City</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="city"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your city name"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="address">Address</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your address"
                    />
                </div>

               

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="zipcode">Zipcode</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={data.zipcode}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your zipcode"
                        min="18"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="blockchainAddress">Wallet Address</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="blockchainAddress"
                        name="blockchainAddress"
                        value={data.blockchainAddress}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your blockchain wallet address"
                    />
                </div>

                <button 
                    type="submit" 
                    className="kyc-submit-btn" 
                    disabled={loading}
                    onClick={handleSubmit}
                >
                
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            </div>
        </div>
     );

}