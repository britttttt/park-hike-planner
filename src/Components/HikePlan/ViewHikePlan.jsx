import { useEffect, useState } from "react"
import { deleteHikePlan, getHikePlanById, getMonths } from "../../Services/HikePlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"


export const ViewHikePlan = () => {

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

                    <div className="drop-down">
                        <h4>
                            Planned Month: {
                                months.find((month) => month.id === hikePlan.monthId)?.name || "Not set"
                            }
                        </h4>

                    </div>
                    <h2>{trail.name} Hike</h2>
                    <h4>{trail.location}</h4>
                    <h4>{trail.distance_miles} miles</h4>
                    <h4>{trail.elevation_gain_ft} ft elevation gain</h4>
                    <h4>{trail.difficulty_score} difficulty score</h4>
                </div>


                <div>
                    <button onClick={() => navigate(`/EditHikePlan/${hikePlan.id}/${trail.id}`)}>
                        Edit Plan
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
