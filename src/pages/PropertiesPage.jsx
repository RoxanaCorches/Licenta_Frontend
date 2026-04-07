import { useState } from "react";
import SearchProperty from "../components/SearchProperty";
import PropertiesImages from "../components/property/PropertiesImages"

export default function PropertiesPage() {
    const [filterProperties, setFilterProperties] = useState(null);

    return(
        <div className="properties-container">
            <div className="properties-content">
                <SearchProperty  onSearchProperties={setFilterProperties}/> 
                <PropertiesImages filterProperties={filterProperties}/>
            </div>
        </div>
    );
}