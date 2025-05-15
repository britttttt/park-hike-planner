import { useNavigate } from "react-router-dom"
import "./MyHikes.css"
import { useEffect, useState } from "react"
import { getHikePlansByUserId } from "../../Services/HikePlanService"
import { getMonths } from "../../Services/HikePlanService"

export const MyHikes = ({ currentUser }) => {
    const [hikePlans, setHikePlans] = useState([])
    const navigate = useNavigate()
    const [months, setMonths] = useState([])

    useEffect(() => {
        getHikePlansByUserId(currentUser.id).then(setHikePlans)
    }, [currentUser.id])

    useEffect(() => {
        getMonths().then(setMonths)
    }, [])

    return (
        <div className="my-hike-plans">
            <h2>My Hike Plans</h2>

            {hikePlans.length === 0 ? (
                <div className="empty-hike-plans">
                    <p>You don't have any hike plans yet.</p>
                    <button
                        className="create-hike-btn"
                        onClick={() => navigate("ChooseTrail")}
                    >
                        Plan Your Hike!
                    </button>
                </div>
            ) : (
                <div className="hike-plan-list">
                    {hikePlans.map((plan) => (
                        <div key={plan.id} className="hike-plan-item">
                            <h3>{plan.title || "Untitled Plan"}</h3>
                            <p>
                                Planned Month: {months.find((month) => month.id === plan.monthId)?.name || "Unknown"}
                            </p>
                            <button onClick={() => navigate(`/ViewHikePlan/${plan.id}/${plan.trailId}`)}>
                                View Plan
                            </button>
                        </div>
                    ))}
                    <div className="new-hike-plan">
                        <h3>Plan a New Hike</h3>
                        <button
                            className="create-hike-btn"
                            onClick={() => navigate("ChooseTrail")}
                        >
                            Plan Your Hike!
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}