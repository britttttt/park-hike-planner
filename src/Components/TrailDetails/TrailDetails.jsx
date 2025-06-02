import { useEffect, useState } from "react"
import "./TrailDetails.css"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"
import { createHikePlan } from "../../Services/HikePlanService"


export const TrailDetails = ({ currentUser }) => {
    const { trailId } = useParams()
    const [trail, setTrail] = useState({})
    const navigate = useNavigate()



    useEffect(() => {
        getTrailById(parseInt(trailId)).then(setTrail)
    }, [trailId])

    const handleCreate = (event) => {
        event.preventDefault()

        const newHikePlan = {
            trailId: parseInt(trailId),
            title: "",
            userId: currentUser.id,
            monthId: "",
            dateCreated: new Date().toISOString()
        }

        createHikePlan(newHikePlan).then((createdPlan) => {
            navigate(`/CreateHikePlan/${createdPlan.id}/${createdPlan.trailId}`)
        })

    }
    const handleBack = (event) => {
        event.preventDefault()
        navigate("/ChooseTrail")
    }


    return (
        <div className="main-container">
            <div className="trail-details-container">
                    <div className="trail-bg">
                <div className="trail">
                <h2>{trail.name}</h2>
                <h3>{trail.location}</h3>
                <h3>{trail.distance_miles} miles</h3>
                <h3>{trail.elevation_gain_ft} ft elevation gain</h3>
                <h3>{trail.difficulty_score} difficulty score</h3>
                </div>
                <div className="btn-container">
                <button className="create-hike-plan-btn"
                    onClick={handleCreate}>
                    Create Hike Itinerary
                </button>
                <button className="back-btn" onClick={handleBack}>Back</button>
                </div>
                </div>
            </div>

            <div className="trail-map">
                {trail.mapURL === null ? (
                    <div className="no-map">
                        <h3>No map data available</h3>
                    </div>
                ) : (

                <iframe src={trail.mapURL} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                )}
            </div>
            <div>
            </div>
        </div>
    )
}