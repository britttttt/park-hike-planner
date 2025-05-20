import { useEffect, useState } from "react"
import { deleteHikePlan, getHikePlanById, getMonths } from "../../Services/HikePlanService"
import { useNavigate, useParams } from "react-router-dom"
import { getTrailById } from "../../Services/TrailService"
import "./ViewHikePlan.css"
import { GetNearbyBirds } from "../../Services/ApiServices"


export const ViewHikePlan = () => {

    const [trail, setTrail] = useState({})
    const [months, setMonths] = useState([])
    const [birds, setBirds] = useState([])
    const [hikePlan, setHikePlan] = useState({
    })

    const { hikePlanId, trailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (hikePlanId) {
            getHikePlanById(parseInt(hikePlanId)).then((data) => {
                setHikePlan(data)
                getTrailById(data.trailId).then((trail) => {
                    setTrail(trail)
                    GetNearbyBirds(trail).then(birds => {
                        setBirds(birds)
                    })
                })
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

        <div className="view-hike-plan">

            <div className="hike-header">
                <h2>Plan Your Hike</h2>
            </div>

            <div className="plan-hike">
                <div className="hike-plan-details">
                    <h2>{hikePlan.title}</h2>
                    <div className="planned-month">
                        <h4>
                            Planned Month: {
                                months.find((month) => month.id === hikePlan.monthId)?.name || "Not set"
                            }
                        </h4>
                    </div>
                </div>

                <div className="layout-row">
                    <div className="trail-details">
                        <h2>{trail.name} Hike</h2>
                        <h3>{trail.location}</h3>
                        <h3>{trail.distance_miles} miles</h3>
                        <h3>{trail.elevation_gain_ft} ft elevation gain</h3>
                        <h3>{trail.difficulty_score} difficulty score</h3>
                    </div>

                    <div className="recent-birds">
                        <h3>Birds Seen Recently Near This Trail</h3>
                        {birds.map((bird) => (
                            <div key={bird.comName} className="bird-entry">
                                <p><strong>{bird.comName}</strong></p>
                                <p>{bird.locName}</p>
                                <img
                                    src={`https://source.unsplash.com/?${bird.comName}`}
                                    alt={`A ${bird.comName}`}
                                    className="bird-image"
                                />
                                <a
                                    href={`https://ebird.org/species/${bird.speciesCode}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bird-link"
                                >
                                    View on eBird
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="button-group">
                <button onClick={() => navigate(`/EditHikePlan/${hikePlan.id}/${trail.id}`)}>
                    Edit Plan
                </button>
                <button
                    className="delete-button"
                    onClick={handleDelete}
                    name="delete"
                >
                    Delete Hike
                </button>
            </div>

        </div>

    )
}
