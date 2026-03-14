//import { useState } from "react";
import { MdApartment } from "react-icons/md";
import { FaTv, FaWifi, FaHotTub,FaSkiing,FaUmbrellaBeach  } from "react-icons/fa";
import { FaKitchenSet, FaHouseFloodWater  } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlinePool, MdOutdoorGrill, MdOutlineFireplace, MdBalcony, MdDeck,MdYard  } from "react-icons/md";
import { GiPoolTableCorner, GiGrandPiano  } from "react-icons/gi";


export default function Facilities({data, completeData, prevStep, nextStep}) {
    /*
         const [data, setData] =useState({
            tv: '',
            wifi: '',
            airConditioning: '',
            kitchen:'',
            washer:'',
            pool:'',
            hotTub:'',
            bbqGrill:'',
            poolTable:'',
            indoorFireplace:'',
            piano:'',
            lakeAccess:'',
            beachAccess:'',
            skiOut:'',
            balcony:'',
            gardenView:'',
            terrace:''
        });
    */
        //const [loading] = useState(false);
        //const [error, setError] = useState('');
         /*
        const handleChange = (e) => {
            const { name, value} = e.target;
            setData(prev => ({...prev, [name]: value}));
        };

         */  
        const handleChange = (e) => {
            const {name, value, type, checked} = e.target;
            completeData({ [name]: type === 'checkbox' ? checked : value});
        };
     
    
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
                    <label className="form-section-label">What does your place offer indoors?</label>
                    <div className="form-type-facility"> 
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="tv"
                                checked={data.tv}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaTv className="form-type-facility-icon"/>
                                <span>TV</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="wifi"
                                checked={data.wifi}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaWifi  className="form-type-facility-icon"/>
                                <span>Wifi</span>
                            </span>
                        </label>
                        
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="kitchen"
                                checked={data.kitchen}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaKitchenSet className="form-type-facility-icon"/>
                                <span>Kitchen</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="washer"
                                checked={data.washer}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <BiSolidWasher className="form-type-facility-icon"/>
                                <span>Washer</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="airConditioning"
                                checked={data.airConditioning}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <TbAirConditioning className="form-type-facility-icon"/>
                                <span>Air Conditioning</span>
                            </span>
                        </label>
                    </div>


                    <label className="form-section-label">What makes your place special?</label>
                    <div className="form-type-facility"> 
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="pool"
                               
                                checked={data.pool}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdOutlinePool className="form-type-facility-icon"/>
                                <span>Pool</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="hotTub"
                                checked={data.hotTub}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaHotTub  className="form-type-facility-icon"/>
                                <span>Hot Tub</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="bbqGrill"
                                checked={data.bbqGrill}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdOutdoorGrill className="form-type-facility-icon"/>
                                <span>BBQ Grill</span>
                            </span>
                        </label>
                        
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="poolTable"
                                checked={data.poolTable}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <GiPoolTableCorner  className="form-type-facility-icon"/>
                                <span>Pool Table</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="indoorFireplace"
                                checked={data.indoorFireplace}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdOutlineFireplace  className="form-type-facility-icon"/>
                                <span>Indoor Fireplace</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="piano"
                                checked={data.piano}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <GiGrandPiano  className="form-type-facility-icon"/>
                                <span>Piano</span>
                            </span>
                        </label>
                    </div>


                    <label className="form-section-label">What outdoor spaces can guests use?</label>
                    <div className="form-type-facility"> 
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="balcony"
                                checked={data.balcony}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdBalcony  className="form-type-facility-icon"/>
                                <span>Balcony</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="terrace"
                                checked={data.terrace}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdDeck  className="form-type-facility-icon"/>
                                <span>Terrace</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="gardenView"
                                checked={data.gardenView}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <MdYard  className="form-type-facility-icon"/>
                                <span>Garden View</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="skiOut"
                                checked={data.skiOut}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaSkiing  className="form-type-facility-icon"/>
                                <span>Ski-Out</span>
                            </span>
                        </label>
                        
                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="lakeAccess"
                                checked={data.lakeAccess}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaHouseFloodWater  className="form-type-facility-icon"/>
                                <span>Lake Access</span>
                            </span>
                        </label>

                        <label className="form-type-facility-option">
                            <input 
                                type="checkbox" 
                                name="beachAccess"
                                checked={data.beachAccess}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaUmbrellaBeach  className="form-type-facility-icon"/>
                                <span>Beach Access</span>
                            </span>
                        </label>
                    </div>
        </div>
        <div className="form-buttons">
            <button type="button" className="form-prev-button" onClick={prevStep}>Previous</button>
            <button type="button" className="form-next-button" onClick={nextStep}>Next</button>
        </div>
    </div>
    );
}