import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/profile/">Profile</Link>
        </div>
    )
}

export default NavBar