import { useEffect, useState } from "react"
import { getHikePlanById, getMonths, saveHikePlan } from "../../Services/HikePlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"
import "./HikePlan.css"

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
            id: hikePlan.id,
            title: hikePlan.title,
            monthId: hikePlan.monthId,
            day: hikePlan.day,
            userId: currentUser.id,
            trailId: trail.id, 
            contactName: hikePlan.contactName,
            contactPhone: hikePlan.contactPhone,
            notes: hikePlan.notes,
            dateCreated: new Date().toISOString()
        }

        saveHikePlan(updateHikePlan).then(() => {
            navigate("/")
        })
    }
    return (
        <div className="hike-details">

            <div className="hike-form-header">
                <h2>{hikePlan.title ||`My ${trail?.name} Hike` }</h2>
            </div>


            <div className="plan-hike">
                <div>
                    <h3>{trail.name}</h3>
                    <h5> {trail.location}</h5>
                    <h5>{trail.distance_miles} miles</h5>
                    <h5>{trail.elevation_gain_ft} ft elevation gain</h5>
                    <h5>{trail.difficulty_score} difficulty score</h5>
                </div>

                <div className="form-group">
                    <h3>Give your trip a title?</h3>
                    <input type="text"
                        className="form-control"
                        placeholder={`My ${trail?.name} Hike`}
                        defaultValue=""
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
                <div className="form-group">
                    <h3>Day</h3>
                    <input type="number"
                        className="form-control"
                        defaultValue={1}
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
                    <h3>Add notes?</h3>
                    <input type="text"
                        className="form-control"
                        placeholder="Notes..."
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.notes = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>
                </div>

                <div className="form-group">
                    <h3>Emergency Contact</h3>
                    <input type="text"
                        className="form-control"
                        placeholder="Emergency Name"
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.contactName = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>
                    <input type="tel"
                        id="phone"
                        className="form-control"
                        placeholder="Emergency Contact Phone #"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={(event) => {
                            const copy = { ...hikePlan }
                            copy.contactPhone = event.target.value
                            setHikePlan(copy)
                        }}>

                    </input>
                </div>



                <div className="save-btn">
                    <button onClick={handleSave}>
                        Save Hike
                    </button>
                </div>



            </div>
        </div>
    )
}