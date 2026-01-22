import { useState } from "react";
import BasicInfo from "../components/listProperty/BasicInfo";
import Location from "../components/listProperty/Location";
import PropertyDetails from "../components/listProperty/PropertyDetails";
import Facilities from "../components/listProperty/Facilities";
import HouseRules from "../components/listProperty/HouseRules";

export default function ListYourPropertyPage() {
    const [step, setStep] = useState(1);
    return(
        <form> 
        {step === 1 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 1: Basic Info</h1>
                    <BasicInfo/>
                    <div className="form-buttons">
                        <button type="button" className="form-next-button" onClick={() => setStep(2)}>Next</button>
                    </div>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 2: Where is your Property?</h1>
                    <Location />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(1)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(3)}>Next</button>
                    </div>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 3: Share some basics about your place</h1>
                    <PropertyDetails />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(2)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(4)}>Next</button>
                    </div>
                </div>
            </div>
        )}

        {step === 4 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 4: Amenities & Facilities</h1>
                    <Facilities />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(3)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(5)}>Next</button>
                    </div>
                </div>
            </div>
        )}

        {step === 5 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 5: House Rules</h1>
                    <HouseRules />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(4)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(6)}>Next</button>
                    </div>
                </div>
            </div>
        )}
        </form>
    );
    
}