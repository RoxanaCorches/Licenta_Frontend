import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HouseRules(){
    const [data, setData] = useState({
                pet: '',
                smoking: '',
                parties: '',
            });

    //hours
    const [hourCheckInFrom, setHourCheckInFrom] = useState("15:00");
    const [hourCheckInUntil, setHourCheckInUntil] = useState("18:00");

    const [hourCheckOutFrom, setHourCheckOutFrom] = useState("15:00");
    const [hourCheckOutUntil, setHourCheckOutUntil] = useState("18:00");

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
    
    
        const handleChangePet = (e) => {
            setData(prev => ({...prev, pet: e.target.value}));
        }

        const handleChangeSmoking = (e) => {
            setData(prev => ({...prev, smoking: e.target.value}));
        }

        const handleChangeParties = (e) => {
            setData(prev => ({...prev, parties: e.target.value}));
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
                                onChange={handleChangePet}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom">
                                <input 
                                type="radio" 
                                name="pet"
                                value="petNo"
                                checked={data.pet === "petNo"}
                                onChange={handleChangePet}
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
                                    onChange={handleChangeSmoking}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom"> 
                                <input 
                                    type="radio" 
                                    name="smoking"
                                    value="smokingNo"
                                    checked={data.smoking === "smokingNo"}
                                    onChange={handleChangeSmoking}
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
                                    onChange={handleChangeParties}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom"> 
                                <input 
                                    type="radio" 
                                    name="parties"
                                    value="partiesNo"
                                    checked={data.parties === "partiesNo"}
                                    onChange={handleChangeParties}
                                />
                                <span className="form-label">NO</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-section-options-checks"> 
                        <div className="check-in"> 
                            <label className="form-label">Check-in</label>

                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">From</label>
                                    <div className="container" onClick = {dropdownPanelCheckInFrom}> 
                                        <span className="">{hourCheckInFrom}</span>
                                        <span > <FaChevronDown /> </span>
                                    </div>
                                

                                {panelCheckInFrom && (
                                <ul className="search-panel-info-checks">
                                    {Array.from({length:24}, (_, index) => {
                                        const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                        return(
                                            <li key={index}>
                                            <span onClick={() =>{ 
                                                setHourCheckInFrom(hour);
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
                            


                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Until</label>
                                        <div className="container" onClick = {dropdownPanelCheckInUntil}> 
                                            <span>{hourCheckInUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                {panelCheckInUntil && (
                                    <ul className="search-panel-info-checks">
                                    {Array.from({length:24}, (_, index) => {
                                        const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                        return(
                                            <li key={index}>
                                            <span onClick={() =>{ 
                                                setHourCheckInUntil(hour);
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
                        </div>


                         <div className="check-out"> 
                            <label className="form-label">Check-out</label>

                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">From</label>
                                    <div className="container" onClick = {dropdownPanelCheckOutFrom}> 
                                        <span>{hourCheckOutFrom}</span>
                                        <span > <FaChevronDown /> </span>
                                    </div>
                                

                                {panelCheckOutFrom && (
                                <ul className="search-panel-info-checks">
                                    {Array.from({length:24}, (_, index) => {
                                        const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                        return(
                                            <li key={index}>
                                            <span onClick={() =>{ 
                                                setHourCheckOutFrom(hour);
                                                setPanelCheckOutFrom(false);
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
                            


                            <div className="container-checkIn-checkOut"> 
                                <div className="checkin-from-until"> 
                                    <label className="form-label">Until </label>
                                        <div className="container" onClick = {dropdownPanelCheckOutUntil}> 
                                            <span>{hourCheckOutUntil}</span>
                                            <span> <FaChevronDown /> </span>
                                        </div>
                                {panelCheckOutUntil && (
                                    <ul className="search-panel-info-checks">
                                    {Array.from({length:24}, (_, index) => {
                                        const hour = index < 10 ? `0${index}:00` : `${index}:00`;

                                        return(
                                            
                                            <li key={index}>
                                            <span onClick={() =>{ 
                                                setHourCheckOutUntil(hour);
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
                    </div>
                </div>
    );
}



