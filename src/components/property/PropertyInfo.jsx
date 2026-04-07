import Navbar from "../Navbar";
import SearchProperty from "../SearchProperty";
import RelevantInfo from "./RelevantInfo";

export default function PropertyInfo() {
    return(
        
       <div className="properties-container">
                   <div className="properties-content">
                       <SearchProperty /> 
                       <RelevantInfo />
                   </div>
               </div>
    );
}