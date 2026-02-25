import { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { IoLocation } from "react-icons/io5";

export default function LocationFilter({ location, setLocation, setPanelLocation }) {
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteServiceRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDBQhtLmyCNqUConAuVxw2MwHjIF1ok6Iw",
    libraries: ["places"]
  });

  useEffect(() => {
    if (isLoaded && !autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

   useEffect(() => {
    if (!autocompleteServiceRef.current) return;

    if (!location) {
      setTimeout(() => {
        setSuggestions([]);
      }, 0);
      return;
    }

    autocompleteServiceRef.current.getPlacePredictions(
      { input: location },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [location, isLoaded]);

  if (loadError) return <div>Failed to load Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const handleSelect = (description) => {
    setLocation(description);
    setPanelLocation(false); 
  };

  return (
    <ul className="search-panel-suggestions">
      {suggestions.slice(0, 5).map((place) => (
        <li className="item"
          key={place.place_id}
          onClick={() => handleSelect(place.description)}
        >
          <IoLocation className="suggestion-icon" /> 
          {place.description}
        </li>
      ))}
    </ul>
  );
}
