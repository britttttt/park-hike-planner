import { useEffect, useState } from "react"
import { deleteHikePlan, getHikePlanById, getMonths, saveHikePlan } from "../../Services/HikePlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"


export const EditHikePlan = ({ currentUser }) => {

    const [trail, setTrail] = useState({})
    const [months, setMonths] = useState([])
    const [hikePlan, setHikePlan] = useState({
    })

    const { hikePlanId, trailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (hikePlanId) {
            getHikePlanById(parseInt(hikePlanId)).then((data) => {
                setHikePlan(data)
                getTrailById(data.trailId).then(setTrail)
            })
        } else if (trailId) {
            getTrailById(parseInt(trailId)).then(setTrail)
        }
    }, [hikePlanId, trailId])


    useEffect(() => {
        getMonths().then((res) => setMonths(res))
    }, [])


    const handleSave = (event) => {
        event.preventDefault()

        const updatedPlan = {
            ...hikePlan,
            userId: currentUser.id,
            trailId: hikePlan.trailId || parseInt(trailId),
            dateCreated: hikePlan.dateCreated || new Date().toISOString(),
        }

        saveHikePlan(updatedPlan).then(() => {
            navigate("/")
        })
    }

    const handleDelete = (event) => {
        event.preventDefault()
        if (event.target.name === "delete") {
            if (window.confirm("Do you want to delete this hike plan?"))
                deleteHikePlan(hikePlan.id).then(() => {
                    window.alert("Hike Plan Deleted")
                    navigate("/")
                })
        }
    }





    return (

        <div>

            <div className="hike-form-header">
                <h2>Plan Your Hike</h2>
            </div>

            <div className="trail-details">

            </div>

            <div className="plan-hike">
                <div>
                    <h2>{hikePlan.title}</h2>
                    <h2>My {trail.name} Hike</h2>
                    <h4>{trail.location}</h4>
                    <h4>{trail.distance_miles} miles</h4>
                    <h4>{trail.elevation_gain_ft} ft elevation gain</h4>
                    <h4>{trail.difficulty_score} difficulty score</h4>
                </div>

                <div className="form-group">
                    <h3>Edit trip title</h3>
                    <input
                        type="text"
                        className="form-control"
                        value={hikePlan.title || ""}
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.title = event.target.value
                            setHikePlan(copy)
                        }}
                    />
                </div>


                <div className="drop-down">
                    <h3>What month is your hike going to be in?</h3>
                    <article className="dropdown">
                        <select
                            id="month-selector"
                            name="month"
                            value={hikePlan.monthId}
                            onChange={(event) => {
                                const copy = { ...hikePlan }
                                copy.monthId = parseInt(event.target.value)
                                setHikePlan(copy)
                            }}
                            required
                        >
                            <option disabled value="">Choose Month</option>
                            {months.map((month) => (
                                <option value={month.id} key={month.id}>
                                    {month.name}
                                </option>
                            ))}
                        </select>
                    </article>
                </div>


                <div>
                    <button onClick={handleSave}>
                        Save Hike
                    </button>
                </div>
                <div>
                    <button onClick={handleDelete}
                        name="delete">
                        Delete Hike
                    </button>
                </div>



            </div>
        </div>
    )
}
