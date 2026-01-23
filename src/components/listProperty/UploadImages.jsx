import { useState } from "react";
import { TbPhotoShare } from "react-icons/tb";

export default function UploadImages(){
    const [mainImage, setMainImage] = useState(null);
    const [otherImage, setOtherImage] = useState([]);

    const handleUploadeMainImage = (e) => {
        const image = e.target.files[0];

        if(image){
            setMainImage({
                image,
                preview: URL.createObjectURL(image)
            });
        }
    };

    const handleUploadeOtherImages = (e) => {
        const images = Array.from(e.target.images);
        const viewImages = images.map(image => ({
            image,
            preview: URL.createObjectURL(image)
        }));
        setOtherImage(prev =>  {
            const max = [...prev, ...viewImages];
            return max.splice(0,4);
        });
    };



    return(
        <div className="form-section"> 
                    <div className="container-upload-images-main"> 
                       <snap className="content-image">Upload at least 5 photos of ypur property.</snap>
                       <div className="upload-image-main"> 
                            <TbPhotoShare className="icon-image-main"/>
                            <div className="file-upload"> 
                                <input
                                    id="mainImageInput"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleUploadeMainImage}
                                />
                                <label htmlFor="mainImageInput" className="upload-button">Upload</label>
                            </div>
                        </div>

                        <div className="view-image">
                            {mainImage &&  (
                                <img
                                    
                                    src={mainImage.preview}
                                    alt={mainImage.image.name}
                                />
                            )}
                        </div>
                    </div>
                        
                     <div className="container-others-images">   
                    {Array.from({ length: 4 }).map((_, containerIndex) => (   
                    <div className="container-upload-images-next"> 
                       <div className="upload-image-next"> 
                            <TbPhotoShare className="icon-image-next"/>
                            <div className="file-upload"> 
                                <input
                                   id={`otherImagesInput-${containerIndex}`}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleUploadeOtherImages}
                                />
                                <label htmlFor="otherImagesInput" className="upload-button">Upload</label>
                            </div>
                        </div>

                        <div className="view-image">
                            {otherImage.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.preview}
                                    alt={img.image.name}
                                />
                            ))}
                        </div>
                    </div>
                    ))}
                    </div>
        </div>
        
    );
}