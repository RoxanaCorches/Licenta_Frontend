import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { GrUploadOption } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";

export default function MyAccountPage() {
    const [image, setImage] = useState(null);
    
        const handleUploadeImage = (e) => {
            const image = e.target.files[0];
    
            if(image){
                setImage({
                    image,
                    preview: URL.createObjectURL(image)
                });
            }
        };

    return (
        <div>
            <Navbar />
            <div className="wrapper-yourAccount">
                <Sidebar />

                <d4iv className="main-container">
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
                            <span className="wallet-address">Wallet address</span>
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
                                    <p className="form-label">username</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">First Name</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Last Name</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Birthday</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Phone Number</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                                            
                        <div className="bottom-right">
                            <div className="form-section"> 
                                <div className="form-section-options"> 
                                    <p className="form-label">Nationality</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>
                        
                                <div className="form-section-options"> 
                                     <p className="form-label">City</p>
                                     <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                     
                                </div>

                                <div className="form-section-options"> 
                                     <p className="form-label">Address</p>
                                     <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Zipcode</p>
                                    <button className="button-edit">
                                        <FaEdit className="icon-edit"/>
                                    </button>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Wallet Address</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </d4iv>
        </div>
     </div>   
    );
}