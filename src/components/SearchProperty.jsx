import { IoLocation } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function SearchProperty (){
    const [panelLocation, setPanelLocation] = useState(false);
    const [panelDate, setPanelDate] = useState(false);
    const [panelMembers, setPanelMembers] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    
     const dropdownPanelLocation = (e) => {
        e.preventDefault();
        setPanelLocation(!panelLocation);
    };

     const dropdownPanelDate = (e) => {
        e.preventDefault();
        setPanelDate(!panelDate);
    };

     const dropdownPanelMembers = (e) => {
        e.preventDefault();
        setPanelMembers(!panelMembers);
    };

    return(
        <div className="search-container"> 

             <div className="search-field">
                <FaRegCalendarAlt className="search-icon" />
                <div className="container-wrapper"> 
                    <div className="container" onClick={dropdownPanelLocation}>
                        <p>Where are you going?</p>
                        <span > <FaChevronDown className="down-icon"/> </span>
                    </div>
                    {panelLocation && (
                   
                    <div className="search-panel">
                        <div className="option">
                            <div className="info">
                                <span>Adults</span>
                                <p>18+ Years Old</p>
                            </div>
                        </div>

                        <div className="option">
                             <div className="info">
                                <span>Children</span>
                                <p>2-17 Years Old</p>
                             </div>
                        </div>

                         <div className="option">
                            <div className="info">
                                <span>Rooms</span>
                                <p> Minimum 1</p>
                            </div>
                        </div>
                    </div>
                )}

                </div>
            </div>


            <div className="search-field">
                <FaRegCalendarAlt className="search-icon" />
                <div className="container-wrapper"> 
                    <div className="container" onClick={dropdownPanelDate}>
                        <p>Check-in date -- Check-out date</p>
                        <span > <FaChevronDown /> </span>
                    </div>
                    {panelDate && (
                   
                    <div className="search-panel">
                        <div className="option">
                            <div className="info">
                                <span>Adults</span>
                                <p>18+ Years Old</p>
                            </div>
                            <button  type="button" onClick = {() => (setAdults(adults - 1))} disabled = {adults <= 1}> <FaMinus className="search-icon-plus-minus"/> </button>
                            <span>{adults}</span>
                            <button type="button" onClick={() =>(setAdults(adults + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>

                        <div className="option">
                             <div className="info">
                                <span>Children</span>
                                <p>2-17 Years Old</p>
                             </div>
                            <button type="button" onClick = {() =>  (setChildren(children - 1))} disabled = {children <= 0}> <FaMinus className="search-icon-plus-minus"/> </button>
                            <span>{children}</span>
                            <button type="button" onClick={() => (setChildren(children + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>

                         <div className="option">
                            <div className="info">
                                <span>Rooms</span>
                                <p> Minimum 1</p>
                            </div>
                            <button type="button" onClick = {() => (setRooms(rooms - 1))} disabled = {rooms <= 1}> <FaMinus className="search-icon-plus-minus "/> </button>
                            <span>{rooms}</span>
                            <button type="button" onClick={() => (setRooms(rooms + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>
                    </div>
                )}
                </div>
            </div>


            <div className="search-field">
                <HiUsers className="search-icon" />

                <div className="container-wrapper"> 
                    <div className="container" onClick={dropdownPanelMembers}>
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
                            <button  type="button" onClick = {() => (setAdults(adults - 1))} disabled = {adults <= 1}> <FaMinus className="search-icon-plus-minus"/> </button>
                            <span>{adults}</span>
                            <button type="button" onClick={() =>(setAdults(adults + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>

                        <div className="option">
                             <div className="info">
                                <span>Children</span>
                                <p>2-17 Years Old</p>
                             </div>
                            <button type="button" onClick = {() =>  (setChildren(children - 1))} disabled = {children <= 0}> <FaMinus className="search-icon-plus-minus"/> </button>
                            <span>{children}</span>
                            <button type="button" onClick={() => (setChildren(children + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>

                         <div className="option">
                            <div className="info">
                                <span>Rooms</span>
                                <p> Minimum 1</p>
                                </div>
                            <button type="button" onClick = {() => (setRooms(rooms - 1))} disabled = {rooms <= 1}> <FaMinus className="search-icon-plus-minus "/> </button>
                            <span>{rooms}</span>
                            <button type="button" onClick={() => (setRooms(rooms + 1))} > <FaPlus className="search-icon-plus-minus" /> </button> 
                        </div>
                    </div>
                )}
                </div>
            </div>

            <button className="button-search">
                Search
            </button>
        </div>
    );
}