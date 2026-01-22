import { useState } from "react";

export default function PropertyDetails(){
    const [guests, setGuests] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);

    return(
        <div className="form-section"> 
                    <div className="form-section-options"> 
                        <p className="form-label">Guests</p>
                        <button className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => (setGuests(guests - 1))} disabled = {guests <= 1}> - </button>
                            <span>{guests}</span>
                            <button type="button" onClick={() => (setGuests(guests + 1))} > + </button> 
                        </button>
                    </div>

                    <div className="form-section-options"> 
                        <p className="form-label">Bedrooms</p>
                        <button className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => (setBedrooms(bedrooms - 1))} disabled = {bedrooms <= 1}> - </button>
                            <span>{bedrooms}</span>
                            <button type="button" onClick={() => (setBedrooms(bedrooms + 1))} > + </button> 
                        </button>
                    </div>

                    <div className="form-section-options"> 
                        <p className="form-label">Bathrooms</p>
                        <button className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => (setBathrooms(bathrooms - 1))} disabled = {bathrooms <= 1}> - </button>
                            <span>{bathrooms}</span>
                            <button type="button" onClick={() => (setBathrooms(bathrooms + 1))} > + </button> 
                        </button>
                    </div>
                    
                </div>
    );
}