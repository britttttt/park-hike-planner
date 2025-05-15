import { useEffect, useState } from "react"
import { getHikePlanById, getMonths, saveHikePlan } from "../../Services/HikePlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"


export const CreateHikePlan = ({ currentUser }) => {

    const [trail, setTrail] = useState({})
    const [months, setMonths] = useState([])
    const [hikePlan, setHikePlan] = useState({
        title: "",
        monthId: 0,
    });

    const { hikePlanId, trailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getHikePlanById(parseInt(hikePlanId)).then(setHikePlan)
    }, [hikePlanId])

    useEffect(() => {
        getTrailById(parseInt(trailId)).then(setTrail)
    }, [trailId])

    useEffect(() => {
        getMonths().then((res) => setMonths(res))
    }, [])




    const handleSave = (event) => {
        event.preventDefault()
        if (!hikePlan.id) {
            console.error("Cannot save hike plan without an ID")
            return
        }

        const updateHikePlan = {
            ...hikePlan,
            userId: currentUser.id,
            dateCreated: new Date().toISOString()
        }

        saveHikePlan(updateHikePlan).then(() => {
            navigate("/")
        })
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
                    <h2>My {trail.name} Hike</h2>
                    <h4>{trail.location}</h4>
                    <h4>{trail.distance_miles} miles</h4>
                    <h4>{trail.elevation_gain_ft} ft elevation gain</h4>
                    <h4>{trail.difficulty_score} difficulty score</h4>
                </div>

                <div className="form-group">
                    <h3>Give your trip a title?</h3>
                    <input type="text"
                        className="form-control"
                        placeholder="Add a hike title"
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.title = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>
                </div>

                <div className="drop-down">
                    <h3>What month is your hike going to be in?</h3>
                    <article className="dropdown">
                        <select
                            id="month-selector"
                            name="month"
                            defaultValue=""
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



            </div>
        </div>
    )
}