import { FaRegCalendarAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useRef, useState } from "react";


export default function Calendar (){
    
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

  
    const dateRef = useRef(null);
    return(
        <div className="search-field">
                <div className="container-wrapper" ref={dateRef}> 
                        <div className="search-panel availability">
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
                    
                </div>
            </div>
        );
    }