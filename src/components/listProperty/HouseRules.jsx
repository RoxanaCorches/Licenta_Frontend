import { useState } from "react";

export default function HouseRules(){
    const [data, setData] = useState({
                pet: '',
                smoking: '',
                occupants: '',
            });

    const [members, setMembers] = useState(1);
        
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
                    <div className="form-section-options"> 
                        <p className="form-label">Pets allowed?</p>
                        <div className="option-yes-no">
                            <label className="ratio-custom">
                                <input 
                                type="radio" 
                                name="pet"
                                value="petYes"
                                checked={data.pet === "petYes"}
                                onChange={handleChangePet}
                                />
                                <span className="form-label">YES</span>
                            </label>
                            
                            <label className="ratio-custom">
                                <input 
                                type="radio" 
                                name="pet"
                                value="petNo"
                                checked={data.pet === "petNo"}
                                onChange={handleChangePet}
                            />
                            <span className="form-label">NO</span>
                            </label> 
                        </div>
                    </div>


                    <div className="form-section-options"> 
                        <p className="form-label">Smoking allowed?</p>
                        <div className="option-yes-no">
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

                    <div className="form-section-options"> 
                        <p className="form-label">Maximum members</p>
                        <div className="buttons-plus-minus">
                            <button type="button" onClick = {() => (setMembers(members - 1))} disabled = {members <= 1}> - </button>
                            <span>{members}</span>
                            <button type="button" onClick={() => (setMembers(members + 1))} > + </button> 
                        </div>
                    </div>
                </div>
    );
}



