import { useState } from "react";
import { TbPhotoShare } from "react-icons/tb";


export default function UploadImages(){
    const [mainImage, setMainImage] = useState(null);
    const [otherImage, setOtherImage] = useState([null, null, null, null]);

    const handleUploadeMainImage = (e) => {
        const image = e.target.files[0];

        if(image){
            setMainImage({
                image,
                preview: URL.createObjectURL(image)
            });
        }
    };

    
    const handleUploadeOtherImages = (e, index) => {
        const images = e.target.files[0];

        if(!images) return;

        const viewImages = [...otherImage];
        viewImages[index] = {
            image: images,
            preview: URL.createObjectURL(images)
        };
        console.log(index,images);
        setOtherImage(viewImages);

        console.log(index,images);
    };

    return(
        <div className="form-section"> 
            <div className="container-upload-images-main"> 
                    <div className="upload-image-main"> 
                        {mainImage &&  (
                            <img
                                className="view-image"
                                src={mainImage.preview}
                                alt={mainImage.image.name}
                            />
                        )}

                        {!mainImage && (
                            <>
                                <span className="content-image">Upload at least 5 photos of ypur property.</span>

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
                            </>
                        )}
                    </div>
            </div>


            <div className="container-others-images">   
                {Array.from({ length: 4 }).map((_, containerIndex) => (   
                    <div className="container-upload-images-next" key={containerIndex}> 

                        <div className="upload-image-next"> 
                            {otherImage[containerIndex] && (
                                <img
                                    className="view-image"
                                    src={otherImage[containerIndex].preview}
                                    alt={otherImage[containerIndex].image.name}
                                   
                                />
                            )}

                           
                          {!otherImage[containerIndex] && ( 
                                <> 
                                    <TbPhotoShare className="icon-image-next"/>
                                    <div className="file-upload"> 
                                        <input
                                            id={`otherImagesInput-${containerIndex}`}
                                            type="file"
                                
                                            accept="image/*"
                                            onChange={(e) => handleUploadeOtherImages(e, containerIndex)}
                                        />
                                        <label htmlFor={`otherImagesInput-${containerIndex}`} className="upload-button">Upload</label>
                                    </div>
                                </>
                            )}
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}