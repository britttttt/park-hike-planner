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

            <div className="hike-plan-details">
                <h1>{hikePlan.title}</h1>
            </div>


            <div className="plan-hike">
                <div className="trail-details">
                    <h2>{trail.name}</h2>
                    <h3>{trail.location}</h3>
                    <h3>{trail.distance_miles} miles</h3>
                    <h3>{trail.elevation_gain_ft} ft elevation gain</h3>
                    <h3>{trail.difficulty_score} difficulty score</h3>
                    <h3>{trail.lat}, {trail.lng}</h3>
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
                <div className="form-group">
                    <h3>Day</h3>
                    <input type="number"
                        className="form-control"
                        value={hikePlan.day}
                        min={1}
                        max={31}
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.day = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>
                </div>

                <div className="form-group">
                    <h3>Update notes?</h3>
                    <input type="text"
                        className="form-control"
                        placeholder="Notes..."
                        value={hikePlan.notes}
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.notes = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>

                    <div className="form-group">
                        <h3>Emergency Contact</h3>
                        <input type="text"
                            className="form-control"
                            placeholder="Emergency Contact Name"
                            value={hikePlan.contactName}
                            onChange={(event) => {
                                const copy = { ...hikePlan }
                                copy.contactName = event.target.value
                                setHikePlan(copy)
                            }}>

                        </input>
                        <input type="tel"
                            id="phone"
                            className="form-control"
                            placeholder="Emergency Contact Name"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={hikePlan.contactPhone}
                            onChange={(event) => {
                                const copy = { ...hikePlan }
                                copy.contactPhone = event.target.value
                                setHikePlan(copy)
                            }}>

                        </input>
                    </div>

                </div>
                <div className="button-group">
                    <button onClick={handleSave}>
                        Save Hike
                    </button>
                    <button className="delete-button"
                        onClick={handleDelete}
                        name="delete">
                        Delete Hike
                    </button>
                </div>



            </div>
        </div>
    )
}
