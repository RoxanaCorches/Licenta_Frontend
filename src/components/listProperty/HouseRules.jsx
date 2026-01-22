import { useState } from "react";

export default function HouseRules(){
    const [data, setData] = useState({
                pet: '',
                smoking: '',
                occupants: '',
            });
        
            //const [loading] = useState(false);
            //const [error, setError] = useState('');
    
    
        const handleChangePet = (e) => {
            setData(prev => ({...prev, pet: e.target.value}));
        }

        const handleChangeSmoking = (e) => {
            setData(prev => ({...prev, smoking: e.target.value}));
        }
        
    return(
        <div className="form-section"> 
                    <div className="form-rules"> 
                        <label className="form-label">Pets allowed?</label>
                        <div> 
                            <input 
                                type="radio" 
                                name="pet"
                                value="petYes"
                                checked={data.pet === "petYes"}
                                onChange={handleChangePet}
                             />
                            <span className="form-label">YES</span>

                            <input 
                                type="radio" 
                                name="pet"
                                value="petNo"
                                checked={data.pet === "petNo"}
                                onChange={handleChangePet}
                            />
                            <span className="form-label">NO</span>
                        </div>
                    </div>

                     <div className="form-rules"> 
                        <label className="form-label" >Smoking allowed?</label>
                        <div className="form-select-rule"> 
                            <label className="ratio-custom">
                                <input 
                                    type="radio" 
                                    name="smoking"
                                    value="smokingYes"
                                    checked={data.smoking === "smokingYes"}
                                    onChange={handleChangeSmoking}
                                />
                                <span className="form-label">YES</span>
                            </label>

                            <label className="ratio-custom"> 
                                <input 
                                    type="radio" 
                                    name="smoking"
                                    value="smokingNo"
                                    checked={data.smoking === "smokingNo"}
                                    onChange={handleChangeSmoking}
                                />
                                <span className="form-label">NO</span>
                            </label>
                        </div>
                    </div>

                     <div className="form-rules"> 
                        <label className="form-label" htmlFor="listingTitle">Maximum number of occupants</label>
                        <div> 
                            
                        </div>
                    </div>
                </div>
    );
}



