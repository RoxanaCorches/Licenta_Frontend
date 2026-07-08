import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FormExistingProperty({data, completeData}) {
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
        
    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;
        completeData({[name]: type === "checkbox" ? checked : value});
    }
        
    return(
        <div className="form-section"> 
            <div className="area-price">
                <label className="form-label" htmlFor="listindescriptiongTitle">Price per night</label>
                <input
                    className="from-input" 
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    required
                    placeholder="Price per night"
                    min={0}
                />
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
            </div>
    );
}
