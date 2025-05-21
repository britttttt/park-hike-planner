import { useNavigate } from "react-router-dom"
import "./MyHikes.css"
import { useEffect, useState } from "react"
import { getHikePlansByUserId } from "../../Services/HikePlanService"
import { getMonths } from "../../Services/HikePlanService"
// import { GetNPSAlerts } from "../../Services/ApiServices"



export const MyHikes = ({ currentUser }) => {
    const [hikePlans, setHikePlans] = useState([])
    const navigate = useNavigate()
    const [months, setMonths] = useState([])

    // const [alert, setAlert] = useState([])
    // const alerts = GetNPSAlerts()


    useEffect(() => {
        getHikePlansByUserId(currentUser.id).then(setHikePlans)
    }, [currentUser.id])

    // useEffect(() => {
    //     alerts(alert).then(setAlert) 
    // }, [alert])

    useEffect(() => {
        getMonths().then(setMonths)
    }, [])




    return (
        <div className="my-hike-plans">


            {hikePlans.length === 0 ? (

                <div className="empty-hike-plans">
                    <h3>You don't have any hike plans yet.</h3>
                    <button
                        className="create-hike-btn"
                        onClick={() => navigate("ChooseTrail")}
                    >
                        Plan Your Hike!
                    </button>
                </div>
            ) : (
                <div className="hike-plan-list">
                    <div className="created-hikes">
                        <div className="hero-header">
                            <h2>My Hike Plans</h2>
                            <h4>Plan your next hike!</h4>
                            <button
                                className="create-hike-btn header-btn"
                                onClick={() => navigate("ChooseTrail")}
                            >
                                Create Plan
                            </button>
                        </div>
                        {hikePlans.map((plan) => (
                            <div key={plan.id} className="hike-plan-item">
                                <h3 className="hike-title">{plan.title || "Untitled Plan"}</h3>
                                <p>
                                    Planned Month: {months.find((month) => month.id === plan.monthId)?.name || "Unknown"}
                                </p>
                                <button onClick={() => navigate(`/ViewHikePlan/${plan.id}/${plan.trailId}`)}>
                                    View Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* <div>
                 {alerts?.map((alert) => (
                            <div key={alert.id} className="bird-entry">
                                <p><strong>{alert.title}</strong></p>
                            </div>
                        ))}
            </div> */}



        </div>
    )
}