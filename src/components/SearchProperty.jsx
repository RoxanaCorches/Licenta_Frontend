import { IoLocation } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import LocationFilter from "./LocationFilter";

export default function SearchProperty ({onSearchProperties}){
    const [panelLocation, setPanelLocation] = useState(false);
    const [panelDate, setPanelDate] = useState(false);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [panelMembers, setPanelMembers] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const locationRef = useRef(null);
    const dateRef = useRef(null);
    const membersRef = useRef(null);

    const [location, setLocation] = useState("");

    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            if(locationRef.current && !locationRef.current.contains(event.target)) {
                setPanelLocation(false);
            }
            if(dateRef.current && !dateRef.current.contains(event.target)) {
                setPanelDate(false);
            }
            if(membersRef.current && !membersRef.current.contains(event.target)) {
                setPanelMembers(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, []);

    const guests = adults + children;
    console.log("Nr guests", guests);

    const handleSearchProperties = () => {
       onSearchProperties({
        location,
        checkIn,
        checkOut,
        guests, 
        rooms
       });
    };

    const isValid = location.trim() !== "" &&
                    checkIn  !== null &&
                    checkOut !== null &&
                    guests >= 2 && 
                    rooms >= 1;
    
    return(
        <div className="search-container"> 
             <div className="search-field">
                <IoLocation  className="search-icon" />
                <div className="container-wrapper" ref={locationRef}>
                    <input
                        type="text"
                        name="location"
                        className="container"
                        value={location}
                        onChange={(e) => {
                        setLocation(e.target.value);
                        setPanelLocation(true);
                        }}
                        onClick={() => setPanelLocation(true)}
                        placeholder="Where are you going?"
                    />

                    {panelLocation && location.length > 0 && (
                        <LocationFilter
                            location={location}
                            setLocation={setLocation}
                            setPanelLocation={setPanelLocation}
                        />
                        
                    )}
                </div>
            </div>

            <div className="search-field">
                <FaRegCalendarAlt className="search-icon" />
                <div className="container-wrapper" ref={dateRef}> 
                    <div className="container" onClick={() => setPanelDate(!panelDate)}>
                        <p>
                        {checkIn && checkOut
                            ? `${checkIn.toLocaleDateString()} -- ${checkOut.toLocaleDateString()}`
                            : checkIn
                            ? `${checkIn.toLocaleDateString()} -- Check-out date`
                            : "Check-in date -- Check-out date"}
                        </p>
                        <span> <FaChevronDown /> </span>
                    </div>
                    {panelDate && (
                        <div className="search-panel date">
                            <div className="calendar">
                                <DayPicker
                                    mode="single"
                                    selected={checkIn}
                                    onSelect={(date) => {
                                        setCheckIn(date);
                                        if (date && checkOut && date >= checkOut) {
                                            setCheckOut(undefined);
                                        }
                                    }}
                                    disabled={{ before: new Date() }}
                                />
                            </div>

                            <div className="calendar">
                                <DayPicker
                                    mode="single"
                                    selected={checkOut}
                                    onSelect={setCheckOut}
                                    disabled={{
                                        before: checkIn || new Date(),
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="search-field">
                <HiUsers className="search-icon" />

                <div className="container-wrapper" ref={membersRef}> 
                    <div className="container" onClick={() => setPanelMembers(!panelMembers)}>
                        <p>{adults} Adults - {children} Children - {rooms} Rooms</p>
                        <span > <FaChevronDown /> </span>
                    </div>

                {panelMembers && (
                   
                    <div className="search-panel">
                        <div className="option">
                            <div className="info">
                                <span>Adults</span>
                                <p>18+ Years Old</p>
                            </div>
                            <button 
                                type="button" 
                                onClick = {() => (setAdults(adults - 1))} 
                                disabled = {adults <= 1}> 
                                <FaMinus className="search-icon-plus-minus"
                            /> 
                            </button>
                            <span>{adults}</span>
                            <button 
                                type="button" 
                                onClick={() =>(setAdults(adults + 1))} 
                            > 
                                <FaPlus className="search-icon-plus-minus" /> 
                            </button> 
                        </div>

                        <div className="option">
                             <div className="info">
                                <span>Children</span>
                                <p>2-17 Years Old</p>
                             </div>
                            <button 
                                type="button" 
                                onClick = {() =>  (setChildren(children - 1))} 
                                disabled = {children <= 0}
                            > 
                                <FaMinus className="search-icon-plus-minus"/> 
                                </button>
                            <span>{children}</span>
                            <button 
                                type="button" 
                                onClick={() => (setChildren(children + 1))} 
                            > 
                                <FaPlus className="search-icon-plus-minus" /> 
                            </button> 
                        </div>

                         <div className="option">
                            <div className="info">
                                <span>Rooms</span>
                                <p> Minimum 1</p>
                                </div>
                            <button 
                                type="button" 
                                onClick = {() => (setRooms(rooms - 1))} 
                                disabled = {rooms <= 1}
                            > 
                                <FaMinus className="search-icon-plus-minus"/> 
                            </button>
                            <span>{rooms}</span>
                            <button 
                                type="button" 
                                onClick={() => (setRooms(rooms + 1))} 
                            > 
                                <FaPlus className="search-icon-plus-minus"/>
                            </button> 
                        </div>
                    </div>
                )}
                </div>
            </div>

            <button 
                className="button-search"
                onClick={handleSearchProperties}
                disabled={!isValid}
            >
                Search
            </button>
        </div>
    );
}
