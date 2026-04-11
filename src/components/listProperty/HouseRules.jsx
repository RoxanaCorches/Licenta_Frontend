import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HouseRules({data, completeData, prevStep, nextStep}) {
    /*
    const [data, setData] = useState({
                pet: '',
                smoking: '',
                parties: '',
            });
    */
    //hours
    /*
    const [hourCheckInFrom, setHourCheckInFrom] = useState("15:00");
    const [hourCheckInUntil, setHourCheckInUntil] = useState("18:00");

    const [hourCheckOutFrom, setHourCheckOutFrom] = useState("15:00");
    const [hourCheckOutUntil, setHourCheckOutUntil] = useState("18:00");
*/
    //panel
    const [panelCheckInFrom, setPanelCheckInFrom] = useState(false);
    const [panelCheckInUntil, setPanelCheckInUntil] = useState(false);

    const [panelCheckOutFrom, setPanelCheckOutFrom] = useState(false);
    const [panelCheckOutUntil, setPanelCheckOutUntil] = useState(false);

    
    const dropdownPanelCheckInFrom = (e) => {
        e.preventDefault();
        setPanelCheckInFrom(!panelCheckInFrom);
    };

     const dropdownPanelCheckInUntil = (e) => {
        e.preventDefault();
        setPanelCheckInUntil(!panelCheckInUntil);
    };

     const dropdownPanelCheckOutFrom = (e) => {
        e.preventDefault();
        setPanelCheckOutFrom(!panelCheckOutFrom);
    };

     const dropdownPanelCheckOutUntil = (e) => {
        e.preventDefault();
        setPanelCheckOutUntil(!panelCheckOutUntil);
    };
        
            //const [loading] = useState(false);
            //const [error, setError] = useState('');
    

            /*
        const handleChangePet = (e) => {
            completeData(prev => ({...prev, pet: e.target.value}));
        }

        const handleChangeSmoking = (e) => {
            completeData(prev => ({...prev, smoking: e.target.value}));
        }

        const handleChangeParties = (e) => {
            completeData(prev => ({...prev, parties: e.target.value}));
        }
            */
        const handleChange = (e) => {
            const {name, type, value, checked} = e.target;
            completeData({[name]: type === "checkbox" ? checked : value});
        }
        
    return(
        <div className="form-section"> 
            <div className="form-section-options"> 
                <p className="form-label">Pets allowed?</p>
                <div className="option-yes-no">
                    <label className="ratio-custom">
                        <input 
                            type="radio" 
                            name="pet"
                            value="petYes"
                            checked={data.pet === "petYes"}
                            onChange={handleChange}
                        />
                        <span className="form-label">YES</span>
                    </label>
                            
                    <label className="ratio-custom">
                        <input 
                            type="radio" 
                            name="pet"
                            value="petNo"
                            checked={data.pet === "petNo"}
                            onChange={handleChange}
                        />
                        <span className="form-label">NO</span>
                    </label> 
                </div>
            </div>


                    <div className="form-section-options"> 
                        <p className="form-label">Smoking allowed?</p>
                        <div className="option-yes-no">
                            <label className="ratio-custom">
                                <input 
                                    type="radio" 
                                    name="smoking"
                                    value="smokingYes"
                                    checked={data.smoking === "smokingYes"}
                                    onChange={handleChange}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom"> 
                                <input 
                                    type="radio" 
                                    name="smoking"
                                    value="smokingNo"
                                    checked={data.smoking === "smokingNo"}
                                    onChange={handleChange}
                                />
                                <span className="form-label">NO</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-section-options"> 
                        <p className="form-label">Parties or events allowed?</p>
                        <div className="option-yes-no">
                            <label className="ratio-custom">
                                <input 
                                    type="radio" 
                                    name="parties"
                                    value="partiesYes"
                                    checked={data.parties === "partiesYes"}
                                    onChange={handleChange}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom"> 
                                <input 
                                    type="radio" 
                                    name="parties"
                                    value="partiesNo"
                                    checked={data.parties === "partiesNo"}
                                    onChange={handleChange}
                                />
                                <span className="form-label">NO</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-section-options-checks"> 
                        <div className="check-in"> 
                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Check-in From</label>
                                        <div className="input-box" onClick = {dropdownPanelCheckInFrom}> 
                                            <span>{data.hourCheckInFrom}</span>
                                            <span > <FaChevronDown /> </span>
                                        </div>

                                    {panelCheckInFrom && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                                return(
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckInFrom: hour});
                                                        setPanelCheckInFrom(false);
                                                    }}
                                                    >
                                                    {hour}
                                                    </span>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                 </div>

                            
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Until </label>
                                        <div className="input-box" onClick = {dropdownPanelCheckInUntil}> 
                                            <span>{data.hourCheckInUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                    {panelCheckInUntil && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckInUntil: hour});
                                                        setPanelCheckInUntil(false);
                                                    }}
                                                    >
                                                    {hour}
                                                    </span>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="check-out"> 
                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Check-out From</label>
                                        <div className="input-box" onClick = {dropdownPanelCheckOutFrom}> 
                                            <span>{data.hourCheckOutFrom}</span>
                                            <span > <FaChevronDown /> </span>
                                        </div>

                                    {panelCheckOutFrom && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    <li key={index}
                                                        onClick={() =>{ 
                                                        completeData({hourCheckOutFrom: hour});
                                                        setPanelCheckOutFrom(false);
                                                    }}
                                                    >
                                                    {hour}
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                 </div>

                            
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Until </label>
                                        <div className="input-box" onClick = {dropdownPanelCheckOutUntil}> 
                                            <span>{data.hourCheckOutUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                    {panelCheckOutUntil && (
                                        <ul className="search-panel-info-checks">
                                            {Array.from({length:24}, (_, index) => {
                                                const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                                return(
                                                    
                                                    <li key={index}>
                                                    <span onClick={() =>{ 
                                                        completeData({hourCheckOutUntil: hour});
                                                        setPanelCheckOutUntil(false);
                                                    }}
                                                    >
                                                    {hour}
                                                    </span>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={prevStep}>Previous</button>
                        <button type="button" className="form-next-button" onClick={nextStep}>Next</button>
                    </div>
            </div>
    );
}



