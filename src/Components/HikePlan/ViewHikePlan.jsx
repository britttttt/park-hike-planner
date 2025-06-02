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

    const handlePrint = (event) => {
        event.preventDefault()
        const printContents = document.querySelector(".hike-plan-details")?.innerHTML;

        const printWindow = window.open("", "_blank", "width=800,height=600");

        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(`
            <html>
                <head>
                    <title>Hike Plan</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                    </style>
                </head>
                <body onload="window.print(); window.close();">
                    ${printContents}
                </body>
            </html>
        `)
            printWindow.document.close()
        }
    };



    return (

        <div className="view-hike-plan">
            <div className="container">
                <div className="hike-plan-details">
                    <h1>{hikePlan.title}</h1>
                    <div className="planned-month">
                        <h4>
                            Planned Month: {
                                months.find((month) => month.id === hikePlan.monthId)?.name || "Not set"
                            } | Day : {hikePlan.day}
                        </h4>
                    </div>
                    <h4>Notes: {hikePlan.notes}</h4>
                    <h4>Emergency Contact: {hikePlan.contactName} | {hikePlan.contactPhone}</h4>

                    <div className="important-btn-container">
                        <button className="important-btn" onClick={() => window.open("https://www.nps.gov/grsm/planyourvisit/emergency.htm", '_blank')}>Great Smoky Mountain National Park Emergency Info</button>
                    </div>


                    <div className="layout-row">

                        <div className="trail-details">
                            <h2>{trail.name}</h2>
                            <h3>{trail.location}</h3>
                            <h3>{trail.distance_miles} miles</h3>
                            <h3>{trail.elevation_gain_ft} ft elevation gain</h3>
                            <h3>{trail.difficulty_score} difficulty score</h3>
                            <h3>{trail.lat}, {trail.lng}</h3>
                        </div>

                        <div className="trail-map">
                            {trail.mapURL === null ? (
                                <div className="no-map">
                                    <h3>No map data available</h3>
                                </div>
                            ) : (

                                <iframe src={trail.mapURL} width="600" height="370" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            )}
                        </div>
                    </div>

                    <div className="recent-birds">
                        <h3>Birds Seen Recently Near This Trail</h3>
                        {birds.map((bird) => (
                            <div key={bird.comName} className="bird-entry">
                                <p><strong>{bird.comName}</strong></p>
                                <p>{bird.locName}</p>
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
                <button
                    className="print-button"
                    onClick={handlePrint}
                    name="print"
                >
                    Print Plan
                </button>
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
