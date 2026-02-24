import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/listProperty/SideBar";
import { GrUploadOption } from "react-icons/gr";

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
                                    <p className="form-label">Username:</p>
                                    <p className="form-label">username</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">First Name:</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Last Name:</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Birthday:</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Phone Number:</p>
                                </div>
                            </div>
                        </div>
                                            
                        <div className="bottom-right">
                            <div className="form-section"> 
                                <div className="form-section-options"> 
                                    <p className="form-label">Nationality:</p>
                                </div>
                        
                                <div className="form-section-options"> 
                                     <p className="form-label">City:</p>
                                     
                                </div>

                                <div className="form-section-options"> 
                                     <p className="form-label">Address:</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Zipcode:</p>
                                </div>

                                <div className="form-section-options"> 
                                    <p className="form-label">Wallet Address:</p>
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