import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const RentalContext = createContext();

export function RentalProvider({children}) {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    
    const nrNights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;

    return(
        <RentalContext.Provider
            value={{
                checkIn,
                checkOut,
                setCheckIn,
                setCheckOut,
                nrNights
      }}
        >
            {children}
        </RentalContext.Provider>
    );
}