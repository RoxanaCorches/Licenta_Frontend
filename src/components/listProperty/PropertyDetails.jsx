export default function PropertyDetails({data, completeData, prevStep, nextStep}){

    const isValid = data.guests !== "" &&
                    data.bedrooms !== "" &&
                    data.bathrooms !== "";
                   
    return(
        <div className="form-section"> 
                    <div className="form-section-options"> 
                        <p className="form-label">Guests</p>
                        <div className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => completeData({guests: data.guests - 1})} 
                                disabled = {data.guests <= 1}> - </button>
                            <span>{data.guests}</span>
                            <button type="button" onClick={() => completeData({guests: data.guests + 1})}> + </button> 
                        </div>
                    </div>

                    <div className="form-section-options"> 
                        <p className="form-label">Bedrooms</p>
                        <div className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => (completeData({bedrooms: data.bedrooms - 1}))} 
                                disabled = {data.bedrooms <= 1}> - </button>
                            <span>{data.bedrooms}</span>
                            <button type="button" onClick={() => (completeData({bedrooms: data.bedrooms + 1}))} > + </button> 
                        </div>
                    </div>

                    <div className="form-section-options"> 
                        <p className="form-label">Bathrooms</p>
                        <div className="buttons-plus-minus" type="button">
                            <button type="button" onClick = {() => (completeData({bathrooms: data.bathrooms - 1}))}
                                 disabled = {data.bathrooms <= 1}> - </button>
                            <span>{data.bathrooms}</span>
                            <button type="button" onClick={() => (completeData({bathrooms: data.bathrooms + 1}))} > + </button> 
                        </div>
                    </div>

                <div className="form-buttons">
                        <button type="button" className="form-prev-button" onClick={prevStep}>Previous</button>
                        <button 
                            type="button" 
                            className="form-next-button" 
                            onClick={nextStep}
                            disabled={!isValid}
                        >Next</button>
                    </div>
                </div>
    );
}