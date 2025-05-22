import { useEffect, useState } from "react";
import { useNPSApi } from "../../Services/NPSApiContext";




export const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([])

    const { getCampgrounds } = useNPSApi();

    useEffect(() => {
        getCampgrounds().then(setCampgrounds);
    }, []);

    return (<div className="park-campgrounds">
        <h3>Campgrounds:</h3>
        {campgrounds?.data?.length > 0 ? (
            campgrounds.data.map((campground) => (
                <div key={campground.id} className="park-campground-item">
                    <h3>{campground?.name}</h3>
                    <p>{campground.reservationInfo}</p>
                </div>
            ))
        ) : (
            <p>No campgrounds available.</p>
        )}
    </div>)

}







