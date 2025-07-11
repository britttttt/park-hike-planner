import { useNavigate } from "react-router-dom"
import "./MyHikes.css"
import { useEffect, useState } from "react"
import { getHikePlansByUserId } from "../../Services/HikePlanService"
import { getMonths } from "../../Services/HikePlanService"
import { useNPSApi } from "../../Services/NPSApiContext"
import { getTrailById } from "../../Services/TrailService"


export const MyHikes = ({ currentUser }) => {
    const [hikePlans, setHikePlans] = useState([])
    const navigate = useNavigate()
    const [months, setMonths] = useState([])
    const [alerts, setAlerts] = useState([])
    const [trails, setTrails] = useState({})

    const { getAlerts } = useNPSApi();

    useEffect(() => {
        getHikePlansByUserId(currentUser.id).then(setHikePlans)
    }, [currentUser.id])


    useEffect(() => {
        getHikePlansByUserId(currentUser.id).then((plans) => {
            setHikePlans(plans)

            const trailData = {}
            const trailPromises = plans.map((plan) => {
                if (!trailData[plan.trailId]) {
                    return getTrailById(plan.trailId).then((trail) => {
                        trailData[plan.trailId] = trail
                    });
                } else {
                    return Promise.resolve()
                }
            });

            Promise.all(trailPromises).then(() => {
                setTrails(trailData)
            })
        })
    }, [currentUser.id])

    useEffect(() => {
        getAlerts().then(setAlerts)
    }, [])

    useEffect(() => {
        getMonths().then(setMonths)
    }, [])




    return (
        <div className="my-hike-plans">
            {hikePlans.length === 0 ? (
                <div className="empty-hike-plans">
                    <h2>You don't have any hike plans yet.</h2>
                    <button
                        className="create-hike-btn header-btn"
                        onClick={() => navigate("ChooseTrail")}
                    >
                        Plan Your Hike!
                    </button>
                </div>

            ) : (

                <div className="hike-layout">

                    <div className="created-hikes">
                        <h2>My Hike Plans</h2>


                        {hikePlans.map((plan) => (
                            <div key={plan.id} className="hike-plan-item">
                                <h3 className="hike-title">
                                    {plan.title || "Untitled Plan"}
                                </h3>
                                <p>{trails[plan.trailId]?.name}</p>
                                <p>
                                    {months.find((month) => month.id === plan.monthId)?.name ||
                                        "Unknown"} {plan.day}
                                </p>
                                <button
                                    onClick={() =>
                                        navigate(`/ViewHikePlan/${plan.id}/${plan.trailId}`)
                                    }
                                >
                                    View Plan
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="hero-header-container">
                        <div className="hero-header">
                            <h3>Plan your next hike!</h3>
                            <button
                                className="create-hike-btn header-btn"
                                onClick={() => navigate("ChooseTrail")}
                            >
                                Create Plan
                            </button>
                        </div>

                        <div className="park-alerts">
                            <div className="header-alert">
                                <h3><a target="_blank" rel="noopener noreferrer" href="https://www.nps.gov/grsm/planyourvisit/conditions.htm">Park Alerts</a>
                                </h3></div>
                            {alerts?.data?.length > 0 ? (
                                alerts.data.map((alert) => (
                                    <div className="alert-details">
                                        <div key={alert.id} className="park-alert">
                                            <h4>⚠️ {alert.title}</h4>
                                            <span class="alert-details-text">{alert.description}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No current alerts.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}