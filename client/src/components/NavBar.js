import { NavLink } from "react-router-dom"
import Signout from "./Signout"

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/">Practice</NavLink>
            <NavLink to="/profile/">Profile</NavLink>
            <Signout />
        </nav>
    )
}

export default Navbar