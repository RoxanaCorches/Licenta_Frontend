import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function SearchProperty (){
    return(
        <div className="search-container"> 
            <div className="search-field">
                <FaMapMarkerAlt className="search-icon" />
                <select className="container" defaultValue="">
                    <option value="" disabled> Where are you going? </option>
                    <option value="1">Paris</option>
                    <option value="2">Italy</option>
                    <option value="3">Maldive</option>
                    <option value="4">Spain</option>
                </select>
            </div>

            <div className="search-field">
                <FaCalendarAlt className="search-icon" />
                <select className="container" defaultValue="">
                    <option value="" disabled> Check-in date -- Check-out date </option>
                    <option value="1">Paris</option>
                    <option value="2">Italy</option>
                    <option value="3">Maldive</option>
                    <option value="4">Spain</option>
                </select>
            </div>

            <div className="search-field">
                <FaUsers className="search-icon" />
                <select className="container" defaultValue="">
                    <option value="" disabled> 2 adults, 1 children, 1 room </option>
                    <option value="1">Paris</option>
                    <option value="2">Italy</option>
                    <option value="3">Maldive</option>
                    <option value="4">Spain</option>
                </select>
            </div>

            <button className="button-search">
                Search
            </button>
        </div>
    );
}