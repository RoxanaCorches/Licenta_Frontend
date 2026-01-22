import { useState } from "react";
import { MdApartment } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import PropertyDetails from "./PropertyDetails";
import Location from "./Location";

export default function BasicInfo() {
    const [data, setData] =useState({
            propertyType: '',
            ListingTitle: '',
            description: '',
            area: '',
        });
    
        const [loading] = useState(false);
        //const [error, setError] = useState('');
    
        const handleChange = (e) => {
            const { name, value} = e.target;
            setData(prev => ({...prev, [name]: value}));
        };

        const handleChangeRadio = (e) => {
            setData(prev => ({...prev, propertyType: e.target.value}));
        }
    
        /*
        const handleSubmit = (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            console.log("Form:", data);
    
            const { propertyType, ListingTitle, description, area} = data;
            if(!propertyType || !ListingTitle || !description || !area ) {
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
                            value={data.ListingTitle}
                            onChange={handleChange}
                            required
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                            placeholder="Area (sqm)"
                            min={0}
                        />
                    </div>
                </div>
    </div>
    );
}