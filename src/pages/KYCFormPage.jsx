import { useState } from "react";
import { FaUserCheck } from "react-icons/fa6";
//import { useNavigate } from "react-router-dom";

export default function KYCFormPage() {
    //const navigate = useNavigate();

    const [data, setData] =useState({
        username: '',
        password: '',
        name: '',
        address: '',
        email: '',
        age: '',
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

        const { username, password, name, address, email, age, address_blockchain} = data;
        if(!username || !password || !name || !address || !email || !age || !address_blockchain) {
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
                    <label className="kyc-label" htmlFor="password">Password</label>
                    <input
                        className="kyc-input" 
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your password"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="name">Full Name</label>
                    <input
                        className="kyc-input" 
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your full name"
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
                    <label className="kyc-label" htmlFor="email">Email</label>
                    <input
                        className="kyc-input" 
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="kyc-form-group">
                    <label className="kyc-label" htmlFor="age">Age</label>
                    <input
                        className="kyc-input" 
                        type="number"
                        id="age"
                        name="age"
                        value={data.age}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your age"
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