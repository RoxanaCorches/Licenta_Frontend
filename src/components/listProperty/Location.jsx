import { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function Location({data, completeData, prevStep, nextStep}){
            const [location, setLocation] = useState(null);
            
            const [loading] = useState(false);
        
            const handleChange = (e) => {
            const { name, value } = e.target;
                completeData({ [name]: value});
            };

            const handleClick = (e) => {
                const selectedLocation = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                };
                setLocation(selectedLocation);

                const geocoder = new window.google.maps.Geocoder();

                geocoder.geocode({ location: selectedLocation }, (response) => {
                    console.log("Geocoder results:", response);

                    const result = response[0];

                    let country = "";
                    let address = "";
                    let nrStreet = "";
                    let city = "";
                    let zipcode = "";

                    result.address_components.forEach((component) => {
                        if (component.types.includes("country")) {
                            country = component.long_name;
                        }

                        if (component.types.includes("route")) {
                            address = component.long_name;
                        }

                        if (component.types.includes("street_number")) {
                            nrStreet = component.long_name;
                        }

                        if ((component.types.includes("locality"))) {
                                    city = component.long_name;
                        }

                        if (component.types.includes("postal_code")) {
                            zipcode = component.long_name;
                        }
                    });

                    const fullAddress = address + " " + nrStreet;

                    completeData({
                        ...data,
                        country: country,
                        street: fullAddress,
                        city: city,
                        zipCode:zipcode
                    });
                });
            };

            const isValid = data.country.trim() !== "" &&
                    data.numberFloor.trim() !== "" &&
                    data.street.trim() !== "" &&
                    data.city.trim() !== "" &&
                    data.zipCode.trim() !== "";

            return(
            <div className="form-section"> 
                    <div className="form-group">
                        <label className="form-label" htmlFor="listingTitle">Country / region</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="country"
                            name="country"
                            value={data.country}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Country / region"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Apartment or floor number (optional)</label>
                        <input
                            className="from-input" 
                            type="number"
                            id="numberFloor"
                            name="numberFloor"
                            value={data.numberFloor}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Apartment or floor number (optional)"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Street address</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="street"
                            name="street"
                            required
                            value={data.street}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Street address"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">City</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={data.city}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="City"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Zip code</label>
                        <input
                            className="from-input" 
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            value={data.zipCode}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Zip code"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label" htmlFor="listindescriptiongTitle">Map location</label>
                        <LoadScript googleMapsApiKey="AIzaSyDBQhtLmyCNqUConAuVxw2MwHjIF1ok6Iw" >
                        <GoogleMap
                            mapContainerStyle={{width: "100%", height: "400px"}}
                            center={{lat: 46.7833561, lng: 23.5341118}}
                            zoom={10}
                            onClick={handleClick}
                        >
                            {location && <Marker position={location}/>}
                            
                        </GoogleMap>
                        </LoadScript>
                        
                    </div>

                     <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={prevStep}>Previous</button>
                        <button 
                            type="button" 
                            className="form-next-button" 
                            onClick={nextStep}
                            disabled={!isValid}
                        >
                            Next
                        </button>
                    </div>           

                </div>
        );
}