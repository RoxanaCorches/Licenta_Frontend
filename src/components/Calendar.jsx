import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useRef, useContext, useState } from "react";
import { RentalContext } from "../hooks/RentalContext";
import { verifyAvailability } from "../services/blockchain/MarketplaceService";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Calendar({ tokenId }) {
    const dateRef = useRef(null);

    const { checkIn, checkOut, setCheckIn, setCheckOut } = useContext(RentalContext);
 
    const [open, setOpen] = useState(false);
    

    return (
        <>
        <Snackbar
                open={open}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    The selected period is busy!
                </Alert>
            </Snackbar>
            
      
        <div className="search-field">
            <div ref={dateRef}>
                <div className="search-panel availability">
                    <div className="calendar">
                        <DayPicker
                            mode="single"
                            selected={checkIn}
                            onSelect={(date) => {
                                if (!date) return;

                                setCheckIn(date);

                                if (checkOut && date >= checkOut) {
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
                            disabled={!checkIn ? true : { before: checkIn }}
                            onSelect={async (date) => {

                                if (!date || !checkIn) return;

                                setCheckOut(date);

                                try {
                                    const startDate = Math.floor(checkIn.getTime() / 1000);
                                    const endDate = Math.floor(date.getTime() / 1000);

                                    const available = await verifyAvailability(
                                        tokenId,
                                        startDate,
                                        endDate
                                    );

                                    if (!available) {
                                        setOpen(true);
                                        setCheckOut(undefined);
                                    }

                                } catch (err) {
                                    console.error(err);
                                    setCheckOut(undefined);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}