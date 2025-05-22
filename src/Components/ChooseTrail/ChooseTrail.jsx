import { useEffect, useRef, useState } from "react"
import "./ChooseTrail.css"
import { getFeatures, getTrails, getTrailsWithFeatures } from "../../Services/TrailService"
import { useNavigate } from "react-router-dom"

export const ChooseTrail = () => {

    const [hikeFormChoices, setHikeFormChoices] = useState({
        trailId: 0,
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
    const pathRef = useRef(null);
    const [pathLength, setPathLength] = useState(0)

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength())
        }
    }, [])


    useEffect(() => {
        getTrailsWithFeatures().then(setTrails)
    }, [])


    useEffect(() => {
        getTrails().then(setTrails)
        getFeatures().then((res) => setFeatures(res))
    }, [])


    useEffect(() => {
        if (!trails.length) return

        let filtered = [...trails]

        if (hikeFormChoices.hikeExperience === 1) {
            filtered = filtered.filter(trail => trail.difficulty_score != null && trail.difficulty_score <= 5)
        }
        if (hikeFormChoices.hikeExperience === 2) {
            filtered = filtered.filter(trail => trail.difficulty_score != null && trail.difficulty_score > 5 && trail.difficulty_score <= 10)
        }
        if (hikeFormChoices.hikeExperience === 3) {
            filtered = filtered.filter(trail => trail.difficulty_score != null && trail.difficulty_score > 10 && trail.difficulty_score <= 15)
        }
        if (hikeFormChoices.hikeExperience === 4) {
            filtered = filtered.filter(trail => trail.difficulty_score != null && trail.difficulty_score > 15 && trail.difficulty_score <= 25)
        }
        if (hikeFormChoices.hikeExperience === 5) {
            filtered = filtered.filter(trail => trail.difficulty_score)
        }

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

        if (hikeFormChoices.hikeLengthMin) {
            filtered = filtered.filter(trail => trail.distance_miles != null && trail.distance_miles >= hikeFormChoices.hikeLengthMin)
        }

        if (hikeFormChoices.hikeLengthMax) {
            filtered = filtered.filter(trail => trail.distance_miles != null && trail.distance_miles <= hikeFormChoices.hikeLengthMax)
        }

        if (hikeFormChoices.hikeElvGain) {
            filtered = filtered.filter(trail => trail.elevation_gain_ft != null && trail.elevation_gain_ft <= hikeFormChoices.hikeElvGain)
        }

        setFilteredTrails(filtered)
    }, [trails, hikeFormChoices, selectedFeatures])

    const navigate = useNavigate()

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

    const handleElevationChange = (event) => {
        const value = parseInt(event.target.value);
        setHikeFormChoices(prev => ({
            ...prev,
            hikeElvGain: value
        }))
    }

    const progress = hikeFormChoices.hikeElvGain / 4200;
    const dashOffset = pathLength * (1 - progress)


    const handleSubmit = (event, trailId) => {
        event.preventDefault()
        navigate(`/TrailDetails/${trailId}`)
    }



    return (
        <div className="Hike-Form">
            <div className="row">

                <div className="column">
                    <div className="hike-form-header">
                        <h2><span className="fancy-number">{filteredTrails.length}</span> Available Trails</h2>
                    </div>
                    <div className="filteredTrails">
                        <div className="trail-result">
                            {filteredTrails.map(trail => (
                                <div key={trail.id} className="trail-card">
                                    <h4>{trail.name}</h4>
                                    <p>{trail.distance_miles} miles</p>
                                    <p>Elevation gain: {trail.elevation_gain_ft} ft</p>
                                    <p>{trail.location}</p>
                                    <button className="form-btn"
                                        value={trail.id}
                                        onClick={(event) => handleSubmit(event, trail.id)}>Select Trail</button>
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

                        <div className="form-group">
                            <h3>Trail Difficulty</h3>
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
                                Less Experience
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
                                Some Experience
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
                            <label>
                                <input className="difficulty-checkbox"
                                    type="radio" value="5" name="hikingExperience"
                                    checked={hikeFormChoices.hikeExperience === 5}
                                    onChange={(event) =>
                                        setHikeFormChoices((prev) => ({
                                            ...prev,
                                            hikeExperience: parseInt(event.target.value),
                                        }))
                                    }
                                />{" "}
                                All Levels
                            </label>
                        </div>



                        <div className="form-group">
                            <div class="tooltip"><h3>Are you bringing dogs?</h3>
                                <span class="tooltiptext">Dogs are not allowed in backcountry trails in the Great Smoky Mountains. There are two dog-friendly trails</span>
                                </div>

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
                        <div className="form-group">
                            <h3>Maximum Length</h3>
                            <input
                                type="range"
                                id="hike-length-max"
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
                            <h3>Minimum Length</h3>
                            <input
                                type="range"
                                id="hike-length-min"
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

                        <h3>Maximum elevation gain</h3>
                        <div className="elevation-graph">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 558" preserveAspectRatio="none"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '80%',
                                    pointerEvents: 'none', // SVG doesn't block interactions
                                }}>
                                <path
                                    ref={pathRef}
                                    d="M 0 600 L 50 550 L 100 500 L 100 500 L 100 500 L 150 500 L 200 450 L 250 450 L 300 400 L 350 400 L 400 350 L 450 300 L 500 300 L 550 250 L 600 200 L 650 200 L 700 150 L 750 100 L 800 50 "
                                    stroke="#1d8f58"
                                    strokeWidth="5"
                                    fill="none"
                                    style={{
                                        strokeDasharray: pathLength,
                                        strokeDashoffset: dashOffset,
                                        transition: 'stroke-dashoffset 0.3s ease'
                                    }}
                                />
                            </svg>
                        </div>
                        <div className="elevation-input">
                            <input type="range"
                                id="elevation-gain"
                                min="0"
                                max="4200"
                                value={hikeFormChoices.hikeElvGain}
                                onChange={handleElevationChange} />
                            <p><output id="value">{hikeFormChoices.hikeElvGain} Feet</output></p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}