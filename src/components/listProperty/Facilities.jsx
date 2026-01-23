import { useState } from "react";
import { MdApartment } from "react-icons/md";
import { FaTv, FaWifi, FaHotTub,FaSkiing,FaUmbrellaBeach  } from "react-icons/fa";
import { FaKitchenSet, FaHouseFloodWater  } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlinePool, MdOutdoorGrill, MdOutlineFireplace, MdBalcony, MdDeck,MdYard  } from "react-icons/md";
import { GiPoolTableCorner, GiGrandPiano  } from "react-icons/gi";


export default function Facilities(){
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
    
        //const [loading] = useState(false);
        //const [error, setError] = useState('');
    
        const handleChange = (e) => {
            const { name, value} = e.target;
            setData(prev => ({...prev, [name]: value}));
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
                                value="tv"
                                checked={data.tv === "tv"}
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
                                value="wifi"
                                checked={data.wifi === "wifi"}
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
                                value="kitchen"
                                checked={data.kitchen === "kitchen"}
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
                                value="washer"
                                checked={data.washer === "washer"}
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
                                value="airConditioning"
                                checked={data.airConditioning === "airConditioning"}
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
                                value="pool"
                                checked={data.pool === "pool"}
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
                                value="hotTub"
                                checked={data.hotTub === "hotTub"}
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
                                value="bbqGrill"
                                checked={data.bbqGrill === "bbqGrill"}
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
                                value="poolTable"
                                checked={data.poolTable === "poolTable"}
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
                                value="indoorFireplace"
                                checked={data.indoorFireplace === "indoorFireplace"}
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
                                value="piano"
                                checked={data.piano === "piano"}
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
                                value="balcony"
                                checked={data.balcony === "balcony"}
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
                                value="terrace"
                                checked={data.terrace === "terrace"}
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
                                value="gardenView"
                                checked={data.gardenView === "gardenView"}
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
                                value="skiOut"
                                checked={data.skiOut === "skiOut"}
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
                                value="lakeAccess"
                                checked={data.lakeAccess === "lakeAccess"}
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
                                value="beachAccess"
                                checked={data.beachAccess === "beachAccess"}
                                onChange={handleChange}
                            />
                            <span className="form-type-facility-content">
                                <FaUmbrellaBeach  className="form-type-facility-icon"/>
                                <span>Beach Access</span>
                            </span>
                        </label>
                    </div>
        </div>
    </div>
    );
}