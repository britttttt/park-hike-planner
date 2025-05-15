import { Link, Navigate } from "react-router-dom"
import ".//NavBar.css"

export const NavBar = () => {
    return (
        <ul className="nav-bar">
            <li className="nav-bar-item">
                <Link className="nav-bar-link" to="/">
                    MyHikes
                </Link>
            </li>
            {localStorage.getItem("hiking_user") ? (
                <li className="nav-bar-item">
                    <Link
                        className="nav-bar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("hiking_user");
                            Navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}