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


    return (
        <div>
            <div className="trail-details">
                <h2>{trail.name}</h2>
                <h3>{trail.location}</h3>
                <h3>{trail.distance_miles} miles</h3>
                <h3>{trail.elevation_gain_ft} ft elevation gain</h3>
                <h3>{trail.difficulty_score} difficulty score</h3>
            </div>
            <div>
                <button className="create-hike-btn"
                    onClick={handleCreate}>
                    Create Hike Itinerary
                </button>
            </div>
        </div>
    )
}