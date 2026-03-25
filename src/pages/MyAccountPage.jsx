import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { GrUploadOption } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { getUserById, updateUser } from "../services/backend/UsersService";
import { useWallet } from "../hooks/WalletContext";

export default function MyAccountPage() {
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(false);

    const [editInfo, setEditInfo] = useState(false);
    const [editField, setEditField] = useState("");
    const [editValue, setEditValue] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { account } = useWallet();
    

    //const idUser = localStorage.getItem("userId");
    const walletAddress = localStorage.getItem("walletAddress");
    //const birthday = localStorage.getItem("birthday");

    console.log("account", account);
    //console.log("userId", idUser);
    

    const handleUploadeImage = (e) => {
        const image = e.target.files[0];
    
        if(image){
            setImage({
                image,
                preview: URL.createObjectURL(image)
            });
        }
    };


    useEffect(() => {
        //if(!idUser) return;

        const loadInfoUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(account);
                setUser(data);
                console.log("Info:", data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadInfoUser();
    }, [account]);

    const idUserConnected = user.idUser;
    localStorage.setItem("idUserConnected", idUserConnected);

    console.log("Id  user connected:", idUserConnected);
    
     const handleUpdate = async() => {
       try {
            setLoading(true);
            const newInfo = {
                ...user, 
                [editField]:editValue
            };
            const newInfoUser =  await updateUser(idUserConnected, newInfo);
            setUser(newInfoUser);
            setEditInfo(false);
            setEditField("");
            setEditValue("");
            console.log(editField);
            console.log(editValue);
            
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
 
    if(error){
        return <div>{error}</div>
    }
    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />

                <div className="main-container">
                    <div className="top">
                        <div className="image-upload-wrapper"> 
                            {image &&  (
                                <img
                                    className="preview-image"
                                    src={image.preview}
                                    alt="preview"
                                />
                            )}
                        
                        {!image && (
                            <>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadeImage}
                                    hidden
                                />

                                <label htmlFor="image" className="upload-area">
                                    <GrUploadOption className="icon"/>
                                   
                                </label>
                            </>
                        )}
                        </div>
                       
                       <div className="info-account"> 
                            <span className="account">My Account</span>
                            <span className="wallet-address">{walletAddress}</span>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="bottom-title">
                             <h2>Personal Details</h2>
                        </div>
                       
                    <div className="bottom-left-right">
                        <div className="bottom-left">
                            <div className="form-section"> 
                                <div className="form-section-options"> 
                                    <p className="form-label">Username</p>
                                    <p className="form-label">{user.username}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("username");
                                            setEditValue(user.username);
                                        }}    
                                    >

                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">First Name</p>
                                    <p className="form-label">{user.firstName}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("firstName");
                                            setEditValue(user.firstName);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">last Name</p>
                                    <p className="form-label">{user.lastName}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("lastName");
                                            setEditValue(user.lastName);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Phone Number</p>
                                    <p className="form-label">{user.phoneNumber}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("phoneNumber");
                                            setEditValue(user.phoneNumber);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Birthday</p>
                                    <p className="form-label">{user.birthday}</p>
                                </div>
                            </div>
                        </div>
                                            
                        <div className="bottom-right">
                            <div className="form-section"> 
                                <div className="form-section-options"> 
                                    <p className="form-label">Nationality</p>
                                    <p className="form-label">{user.nationality}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("nationality");
                                            setEditValue(user.nationality);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>
                        
                                <div className="form-section-options"> 
                                     <p className="form-label">City</p>
                                     <p className="form-label">{user.city}</p>
                                     <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("city");
                                            setEditValue(user.city);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                     
                                </div>

                                <div className="form-section-options"> 
                                     <p className="form-label">Address</p>
                                     <p className="form-label">{user.address}</p>
                                     <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("address");
                                            setEditValue(user.address);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Zipcode</p>
                                    <p className="form-label">{user.zipcode}</p>
                                    <button 
                                        className="button-edit"
                                        onClick={() => {
                                            setEditInfo(true);
                                            setEditField("zipcode");
                                            setEditValue(user.zipcode);
                                        }}    
                                    >
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Wallet Address</p>
                                    <p className="form-label"> {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
                                  
                                </div>
                            </div>
                        </div>

                        {editInfo && (
                        <div className="edit-container">
                        <div className="modal-edit">
                            <h2>Edit {editField}</h2>
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />

                            <div className="modal-edit-buttons">
                                <button className="cancel" onClick={() => setEditInfo(false)}>
                                    Cancel
                                </button>

                                <button  
                                    className="submit" 
                                    onClick={handleUpdate} 
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                        </div>
                        </div>
                    )} 

                    </div>
                    </div>
                </div>
        </div>
     </div>   
    );
}