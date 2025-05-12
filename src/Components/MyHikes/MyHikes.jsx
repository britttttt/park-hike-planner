import { useNavigate } from "react-router-dom"
import "./MyHikes.css"

export const MyHikes = () => {
   const navigate = useNavigate()

    return (
    
    <div className="main-container">
        <div className="header-container">
            <h2>You Don't Have Any Hikes Planned!</h2>
        </div>
        <div className="create-hike-btn">
            <button className="create-hike-btn"
            onClick={()=>{
                navigate("HikeForm")
            }}
            >Plan Your Hike</button>
        </div>

    </div>
    )
}