import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useRef, useContext } from "react";
import { RentalContext } from "../hooks/RentalContext";


export default function Calendar () {
    const dateRef = useRef(null);
    const { checkIn, checkOut, setCheckIn, setCheckOut } =
        useContext(RentalContext);

    return(
        <div className="search-field">
                <div  ref={dateRef}> 
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