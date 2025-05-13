import { useEffect, useState } from "react"
import "./HikeForm.css"
import { getFeatures, getTrails } from "../../Services/TrailService"
import { useNavigate } from "react-router-dom"
import { getMonths } from "../../Services/HikePlanService"

export const HikeForm = () => {

    const [hikeFormChoices, setHikeFormChoices] = useState({
        month: "",
        hikeExperience: 0,
        hikeLengthMax: 0,
        hikeLengthMin: 0,
        hikeElvGain: 0,
        bringingDogs: false,
        mobilityAccessibility: false,
        hikeFeatures: []
    })

    const [trails, setTrails] = useState([])
    const [filteredTrails, setFilteredTrails] = useState([])
    const [features, setFeatures] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [months, setMonths] = useState([])

    useEffect(() => {
        getTrails().then(setTrails)
        getFeatures().then((res) => setFeatures(res))
        getMonths().then((res) => setMonths(res))
    }, [])


    useEffect(() => {
        if (!trails.length) return

        let filtered = [...trails]

        if (hikeFormChoices.mobilityAccessibility) {
            filtered = filtered.filter(trail => trail.mobilityAccessibility)
        }

        if (hikeFormChoices.bringingDogs) {
            filtered = filtered.filter(trail => trail.dogFriendly)
        }

        if (selectedFeatures.length > 0) {
            filtered = filtered.filter(trail =>
                selectedFeatures.every(feature => trail.features.includes(feature))
            )
        }

        if(hikeFormChoices.hikeLengthMin) {
            filtered = filtered.filter( trail => trail.distance_miles != null && trail.distance_miles >= hikeFormChoices.hikeLengthMin)
        }

        if(hikeFormChoices.hikeLengthMax) {
            filtered = filtered.filter( trail => trail.distance_miles != null && trail.distance_miles <= hikeFormChoices.hikeLengthMax)
        }

        if(hikeFormChoices.hikeElvGain) {
            filtered = filtered.filter(trail => trail.elevation_gain_ft != null && trail.elevation_gain_ft <= hikeFormChoices.hikeElvGain)
        }
        
        setFilteredTrails(filtered)
    }, [trails, hikeFormChoices, selectedFeatures])

    const navigate = useNavigate()


    const handleSelection = (event) => {
        setHikeFormChoices((prev) => ({
            ...prev,
            month: parseInt(event.target.value),
        }))
    }


    const handleFeatures = (event) => {
        const id = parseInt(event.target.value)
        setSelectedFeatures((prevSelected) => {
            let updated
            if (event.target.checked) {
                updated = [...prevSelected, id]
            } else {
                updated = prevSelected.filter((featureId) => featureId !== id)
            }

            setHikeFormChoices(prev => ({
                ...prev,
                hikeFeatures: updated
            }))

            return updated
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/FilteredTrails`)
    }


    return (
        <div className="Hike-Form">
            <div className="row">

                <div className="column">
                    <div className="hike-form-header">
                    <h2>{filteredTrails.length} Available Trails</h2>
                    </div>
                    <div className="filteredTrails">
                        <div className="trail-result">
                            {filteredTrails.map(trail => (
                                <div key={trail.id} className="trail-card">
                                    <h4>{trail.name}</h4>
                                    <p>{trail.distance_miles} miles</p>
                                    <p>Elevation gain: {trail.elevation_gain_ft} ft</p>
                                    <p>{trail.location}</p>
                                    <p>{trail.features}</p>
                                    <button className="form-btn"
                                        onClick={handleSubmit}>Select Trail</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="hike-form-header">
                        <h2>Plan Your Hike</h2>
                    </div>
                    <div className="plan-hike">
                        <div className="drop-down">
                            <h3>What month is your hike going to be in?</h3>
                            <article className="dropdown">
                                <select
                                    id="month-selector"
                                    name="month"
                                    value={hikeFormChoices.month}
                                    onChange={handleSelection}
                                    required
                                ><option disabled value="">
                                        Choose Month
                                    </option>
                                    {months.map((month) => {
                                        return (
                                            <option value={month.id} key={month.id}>
                                                {month.name}
                                            </option>
                                        )
                                    })}
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
                                    checked={hikeFormChoices.hikeExperience === 4}
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
                            <h3>Minimum Length</h3>
                            <input
                                type="range"
                                id="hike-length"
                                min="0"
                                max="16"
                                value={hikeFormChoices.hikeLengthMin}
                                onChange={(event) => {
                                    setHikeFormChoices(prev => ({
                                        ...prev,
                                        hikeLengthMin: parseInt(event.target.value)
                                    }))
                                }}
                            />
                            <p><output id="value">{hikeFormChoices.hikeLengthMin}</output> Miles</p>
                        </div>

                        <div className="form-group">
                            <h3>Maximum Length</h3>
                            <input
                                type="range"
                                id="hike-length"
                                min="0"
                                max="16"
                                value={hikeFormChoices.hikeLengthMax}
                                onChange={(event) => {
                                    setHikeFormChoices(prev => ({
                                        ...prev,
                                        hikeLengthMax: parseInt(event.target.value)
                                    }))
                                }}
                            />
                            <p><output id="value">{hikeFormChoices.hikeLengthMax}</output> Miles</p>
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
                                        hikeElvGain: parseInt(event.target.value)
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
                                            bringingDogs: event.target.value === "true"
                                        }))
                                    }} /> Yes
                            </label>
                            <label>
                                <input className="dog-checkbox" type="radio" name="dog-checkbox"
                                    value={false}
                                    onChange={(event) => {
                                        setHikeFormChoices(prev => ({
                                            ...prev,
                                            bringingDogs: event.target.value === "true"
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
                                            mobilityAccessibility: event.target.value === "true"
                                        }))
                                    }} /> Yes
                            </label>
                            <label>
                                <input className="mobilityAid-checkbox" type="radio"
                                    name="mobility-aid"
                                    value={false}
                                    onChange={(event) => {
                                        setHikeFormChoices(prev => ({
                                            ...prev,
                                            mobilityAccessibility: event.target.value === "true"
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
                    </div>
                </div>

            </div>
        </div>
    )
}