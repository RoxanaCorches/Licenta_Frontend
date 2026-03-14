import { MdApartment } from "react-icons/md";
import { IoHome } from "react-icons/io5";

export default function BasicInfo({data, completeData, nextStep}) {
        const handleChange = (e) => {
            const {name, type, value, checked} = e.target;
            completeData({[name]: type === "checkbox" ? checked : value});
        };

    return(
     <div> 
        <div className="form-section"> 
                    <label className="form-section-label">Property Type</label>
                    <div className="form-type-property"> 
                        <label className="form-type-property-option">
                            <input 
                                type="radio" 
                                name="propertyType"
                                value="apartment"
                                checked={data.propertyType === "apartment"}
                                onChange={handleChange}
                            />
                            <span className="form-type-property-content">
                                <MdApartment className="form-type-property-icon"/>
                                <span>Apartment</span>
                            </span>
                        </label>

                        <label className="form-type-property-option">
                            <input 
                                type="radio"
                                name="propertyType"
                                value="house"
                                checked={data.propertyType === "house"}
                                onChange={handleChange}
                            />
                            <span className="form-type-property-content">
                                <IoHome className="form-type-property-icon"/>
                                <span>House</span>
                            </span>
                        </label>
                    </div>
                </div>


                <div className="form-section"> 
                    <div className="form-group">
                        <label className="form-label" htmlFor="listingTitle">Listing Title</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="listingTitle"
                            name="listingTitle"
                            value={data.listingTitle}
                            onChange={handleChange}
                            required
                            //disabled={loading}
                            placeholder="Listing title"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Description</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                            //disabled={loading}
                            placeholder="Description"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Area (sqm)</label>
                        <input
                            className="from-input" 
                            type="number"
                            id="area"
                            name="area"
                            value={data.area}
                            onChange={handleChange}
                            required
                            //disabled={loading}
                            placeholder="Area (sqm)"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Price per night</label>
                        <input
                            className="from-input" 
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            //disabled={loading}
                            placeholder="Price per night"
                            min={0}
                        />
                    </div>
                </div>
                <div className="form-buttons">
                        <button type="button" className="form-next-button" onClick={nextStep}>Next</button>
                </div>
    </div>
    );
}