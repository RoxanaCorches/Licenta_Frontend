import { TbPhotoShare } from "react-icons/tb";

export default function UploadImages({data, completeData}){

    /*
    const handleUploadeMainImage = (e) => {
        const image = e.target.files[0];

        if(image){
            completeData({
                mainImage: {
                image,
                preview: URL.createObjectURL(image)
                }
            });
        }
    };
    */
    const handleUploadeMainImage = (e) => {
        const image = e.target.files[0];

        if(image){
            completeData({
                mainImage: image
            });
        }
    };

    const handleUploadeOtherImages = (e, index) => {
        const image = e.target.files[0];

        if(!image) return;

        const viewImages = [...data.otherImage];
         viewImages[index] = image;
        /*
        viewImages[index] = {
            image,
            preview: URL.createObjectURL(image)
        };
        */
        console.log(index,image);
        completeData({otherImage: viewImages});

        console.log(index,image);
    };

    return(
        <div className="form-section"> 
            <div className="container-upload-images-main"> 
                    <div className="upload-image-main"> 
                        <div className="wrapper-image">
                            {data.mainImage &&  (
                            <img
                                className="view-image"
                                src={URL.createObjectURL(data.mainImage)}
                                alt={data.mainImage.name}
                            />
                            )}
                        <button className="delete-button">&times;</button>
                        </div>
                       
                        {!data.mainImage && (
                            <>
                                <span className="content-image">Upload at least 5 photos of your property.</span>

                                <TbPhotoShare className="icon-image-main"/>
                                <div className="file-upload"> 
                                    <input
                                        id="mainImageInput"
                                        type="file"
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
                            {data.otherImage[containerIndex] && (
                                <img
                                    className="view-image"
                                    src={URL.createObjectURL(data.otherImage[containerIndex])}
                                    alt={data.otherImage[containerIndex].name}
                                   
                                />
                            )}

                           
                          {!data.otherImage[containerIndex] && ( 
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