import { useState } from "react";
import Navbar from "../components/Navbar";
//import { useNavigate } from "react-router-dom";

export default function KYCFormPage() {
    //const navigate = useNavigate();

    const [data, setData] =useState({
        username: '',
        first_name: '',
        last_name: '',
        birthday: '',
        phone_number: '',
        nationality:'',
        city: '',
        address: '',
        zipcode: '',
        address_blockchain: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log("Form:", data);

        const { username, first_name, last_name, birthday, phone_number, nationality, city, address, zipcode, address_blockchain} = data;
        if(!username || !first_name || !last_name || !birthday || !phone_number || !nationality || !city || !address || !zipcode || !address_blockchain) {
            setError("You must complete all fields!");
            setLoading(false);
            return;
        }
        
        // Aici poți adăuga logica de trimitere a datelor
        setTimeout(() => {
            setLoading(false);
            // navigate('/properties'); // decomentează când vrei să navighezi
        }, 1000);
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
                    <label className="kyc-label" htmlFor="first_name">First Name</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your first name"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="last_name">Last Name</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
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
                    <label className="kyc-label" htmlFor="phone_number">Phone Number</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={data.phone_number}
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
                    <label className="kyc-label" htmlFor="address_blockchain">Wallet Address</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="address_blockchain"
                        name="address_blockchain"
                        value={data.address_blockchain}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your blockchain wallet address"
                    />
                </div>

                <button type="submit" className="kyc-submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            </div>
        </div>
     );

}