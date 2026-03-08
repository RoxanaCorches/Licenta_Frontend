//import { useState } from "react";
import { MdApartment } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import PropertyDetails from "./PropertyDetails";
import Location from "./Location";

export default function BasicInfo({data, updateData, nextStep}) {
   
        //const [loading, setLoading] = useState(false);
        //const [error, setError] = useState('');
    
        const handleChange = (e) => {
            const { name, value, type, checked} = e.target;
            updateData({ [name]: type === 'checkbox' ? checked:value});
            //setData(prev => ({...prev, [name]: value}));
        };

        const handleChangeRadio = (e) => {
            updateData({ propertyType: e.target.value});
        };
    
        
        
        /*
        const handleSubmit = (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);
    
            //const { propertyType, ListingTitle, description, area} = data;
            const {listingTitle, description, area} = data;
            //if(!propertyType || !ListingTitle || !description || !area ) {
            if(!listingTitle || !description || !area ) {
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
    */


    return(
     <div> 
        <div className="form-section"> 
                    <label className="form-section-label">Property Type</label>
                    <div className="form-type-property"> 
                        <label className="form-type-property-option">
                            <input 
                                type="radio" 
                                name="typeProperty"
                                value="apartment"
                                checked={data.propertyType === "apartment"}
                                onChange={handleChangeRadio}
                            />
                            <span className="form-type-property-content">
                                <MdApartment className="form-type-property-icon"/>
                                <span>Apartment</span>
                            </span>
                        </label>

                        <label className="form-type-property-option">
                            <input 
                                type="radio" 
                                name="typeProperty"
                                value="house"
                                checked={data.propertyType === "house"}
                                onChange={handleChangeRadio}
                            />
                            <span className="form-type-property-content">
                                <MdApartment className="form-type-property-icon"/>
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