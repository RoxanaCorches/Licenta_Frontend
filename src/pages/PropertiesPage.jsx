import Navbar from "../components/Navbar";
import SearchProperty from "../components/SearchProperty";
import PropertiesImages from "../components/property/PropertiesImages"

export default function PropertiesPage() {
    return(
        <div className="properties-container">
            <Navbar />
            <div className="properties-content">
                    { /*<h1 className="properties-title">Property Listings</h1>  <SearchProperty /> 
                <PropertiesImages /> */}
                <SearchProperty /> 
                <PropertiesImages />
                
              
            </div>
        </div>
    );
}