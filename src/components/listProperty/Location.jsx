import { useState } from "react";
import { MdApartment } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export default function Location(){
        const [data, setData] =useState({
                country: '',
                numberFloor: '',
                street: '',
                city: '',
                zipCode:'',
                mapLocation:''
            });
        
            const [loading] = useState(false);
            //const [error, setError] = useState('');
        
            const handleChange = (e) => {
                const { name, value} = e.target;
                setData(prev => ({...prev, [name]: value}));
            };
    
           
            return(
            <div className="form-section"> 
                    <div className="form-group">
                        <label className="form-label" htmlFor="listingTitle">Country / region</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="country"
                            name="country"
                            value={data.country}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Country / region"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Apartment or floor number (optional)</label>
                        <input
                            className="from-input" 
                            type="number"
                            id="numberFloor"
                            name="numberFloor"
                            value={data.numberFloor}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Apartment or floor number (optional)"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Street address</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="street"
                            name="street"
                            required
                            value={data.street}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Street address)"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">City</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={data.city}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="City"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Zip code</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            value={data.zipCode}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Zip code"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Map location</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="mapLocation"
                            name="mapLocation"
                            required
                            value={data.mapLocation}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Map location"
                        />
                    </div>
                </div>
        );
}