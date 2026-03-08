import { useState } from "react";
import BasicInfo from "../components/listProperty/BasicInfo";
import Location from "../components/listProperty/Location";
import PropertyDetails from "../components/listProperty/PropertyDetails";
import Facilities from "../components/listProperty/Facilities";
import HouseRules from "../components/listProperty/HouseRules";
import UploadImages from "../components/listProperty/UploadImages";

export default function ListYourPropertyPage() {
    const [step, setStep] = useState(1);
    const totalSteps = 5;
    const progress = (step / totalSteps) * 100; 

    const [data, setData] = useState({
        istingTitle: '',
            description: '',
            area: '',
            price: '',
            country: '',
            numberFloor: '',
            street: '',
            city: '',
            zipCode:'',
            guests: 1,
            bedrooms:1,
            bathrooms:1,
            tv: '',
            wifi: '',
            airConditioning: '',
            kitchen:'',
            washer:'',
            pool:'',
            hotTub:'',
            bbqGrill:'',
            poolTable:'',
            indoorFireplace:'',
            piano:'',
            lakeAccess:'',
            beachAccess:'',
            skiOut:'',
            balcony:'',
            gardenView:'',
            terrace:'',
            pet: '',
            smoking: '',
            parties: '',
            checkIn:'',
            checkOut:'',
            images:''
            //mapLocation:''
    });

    const updateData = (newData) => {
        setData(prev => ({...prev, ...newData}));
    };

    /*
    const createApartment = () => {

    }
        */

    return(
        <form> 
         <div className="progress-bar">
            <div className="progress"
                style={{ width: `${progress}%` }}
             >   
            </div>     
        </div>

        {step === 1 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 1: Basic Info</h1>
                    <BasicInfo
                        data={data}
                        updateData={updateData}
                        nextStep={() => setStep(2)}
                    />
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 2: Where is your Property?</h1>
                    <Location 
                        data={data}
                        updateData={updateData}
                        prevStep={() => setStep(1)}
                        nextStep={() => setStep(3)}
                    />
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 3: Share some basics about your place</h1>
                    <PropertyDetails 
                        data={data}
                        updateData={updateData}
                        prevStep={() => setStep(2)}
                        nextStep={() => setStep(4)}
                    />
                    
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

        {step === 6 && ( 
            <div className="form-container">
                <div className="form-step active">
                    <h1 className="form-step-title">Step 6: Upload Images</h1>
                    <UploadImages />
                    <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={() => setStep(5)}>Previous</button>
                        <button type="button" className="form-next-button" onClick={() => setStep(7)}>Submit</button>
                    </div>
                </div>
            </div>
        )}
        </form>
    );
}