import { useEffect, useState } from "react"
import "./HikeForm.css"
import { getFeatures, getTrails } from "../../Services/TrailService"
import { useNavigate } from "react-router-dom"

export const HikeForm = () => {

    const [hikeFormChoices, setHikeFormChoices] = useState({
        month: "",
        hikeExperience: 0,
        hikeLength: 0,
        hikeElvGain: 0,
        bringingDogs: false,
        mobilityAccessibility: false,
        hikeFeatures: []
    })

    const [trails, setTrails] = useState([])

    useEffect(() => {
        getTrails().then(setTrails)
    }, [])

    const [features, setFeatures] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])

    useEffect(() => {
        getFeatures().then((res) => setFeatures(res))
    }, [])




    const navigate = useNavigate()

    const handleFeatures = (event) => {
        const id = parseInt(event.target.value)
        if (event.target.checked) {
            setSelectedFeatures((prev) => [...prev, id]);
        } else {
            setSelectedFeatures(
                setSelectedFeatures((prev) => prev.filter((featureId) => featureId !== id))
            );
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/FilteredTrails`)
    }




    return (
        <div className="Hike-Form">
            <div className="hike-form-header">
                <h2>Plan Your Hike</h2>
            </div>
            <div className="drop-down">
                <h3>What month is your hike going to be in?</h3>
                <article className="dropdown">
                    <select id="month-selector"
                        required
                        default value=""
                        onChange={() => {
                        }}
                    ><option disabled value="">
                            Choose Month
                        </option>
                    </select>
                </article>
            </div>


            <div className="form-group">
                <h3>Hiking Experience Required</h3>
                <label>
                    <input className="difficulty-checkbox"
                        type="radio" value="1" name="hikingExperience"
                        checked={hikeFormChoices.hikeExperience === 1}
                        onChange={(event) =>
                            setHikeFormChoices((prev) => ({
                                ...prev,
                                hikeExperience: parseInt(event.target.value),
                            }))
                        }
                    />{" "}
                    None
                </label>
                <label>
                    <input className="difficulty-checkbox"
                        type="radio" value="2" name="hikingExperience"
                        checked={hikeFormChoices.hikeExperience === 2}
                        onChange={(event) => 
                            setHikeFormChoices((prev) => ({
                                ...prev,
                                hikeExperience: parseInt(event.target.value),
                            }))
                        }
                            />{" "} 
                            Some
                </label>
                <label>
                    <input className="difficulty-checkbox"
                        type="radio" value="3" name="hikingExperience"
                        checked={hikeFormChoices.hikeExperience === 3}
                        onChange={(event) => 
                        setHikeFormChoices((prev) => ({
                            ...prev,
                            hikeExperience: parseInt(event.target.value),
                            }))
                        } />{" "}
                         Moderate
                </label>
                <label>
                    <input className="difficulty-checkbox"
                        type="radio" value="4" name="hikingExperience" 
                        checked = {hikeFormChoices.hikeExperience === 4}
                        onChange={(event) => 
                            setHikeFormChoices((prev) => ({
                                ...prev,
                                hikeExperience: parseInt(event.target.value),
                            }))
                        }
                         />{" "}
                         Expert
                </label>
            </div>

            <div className="form-group">
                <h3>Maximum Length</h3>
                <input
                    type="range"
                    id="hike-length"
                    min="0"
                    max="16"
                    value={hikeFormChoices.hikeLength}
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            hikeLength: event.target.value
                        }));
                    }}
                />
                <p><output id="value">{hikeFormChoices.hikeLength}</output> Miles</p>
            </div>

            <div className="form-group">
                <h3>Maximum elevation gain</h3>
                <input type="range"
                    id="elevation-gain"
                    min="0"
                    max="4200"
                    value={hikeFormChoices.hikeElvGain}
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            hikeElvGain: event.target.value
                        }))
                    }} />
                <p><output id="value">{hikeFormChoices.hikeElvGain} Feet</output></p>
            </div>

            <div className="form-group">
                <h3>Are you bringing dogs?</h3>
                <label>
                    <input className="dog-checkbox" type="radio" name="dog-checkbox"
                    value={true} 
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            bringingDogs: event.target.value
                        }))
                    }} /> Yes
                </label>
                <label>
                    <input className="dog-checkbox" type="radio" name="dog-checkbox"
                    value={false}
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            bringingDogs: event.target.value
                        }))
                    }} /> No
                </label>
            </div>

            <div className="form-group">
                <h3>Does your hike need to be accessible for wheelchairs or strollers?</h3>
                <label>
                    <input className="mobilityAid-checkbox" type="radio" 
                    name="mobility-aid"
                    value={true}
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            mobilityAccessibility: event.target.value
                        }))
                    }}/> Yes
                </label>
                <label>
                    <input className="mobilityAid-checkbox" type="radio"
                    name="mobility-aid"
                    value={false}
                    onChange={(event) => {
                        setHikeFormChoices(prev => ({
                            ...prev,
                            mobilityAccessibility: event.target.value
                        }))
                    }} /> No
                </label>
            </div>


            <div className="hike-features">
                <h3>Features you want to see on your hike</h3>
                {features.map((feature) => (
                    <div className="feature" key={feature.id}>
                        <label>
                            <input className="feature-checkbox"
                                type="checkbox"
                                value={feature.id}
                                checked={selectedFeatures.includes(feature.id)}
                                onChange={handleFeatures} />
                            {feature.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className="submit-btn">
                <button className="form-btn"
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}