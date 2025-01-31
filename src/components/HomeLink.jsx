import { Link } from "react-router-dom"
import { IoHome } from "react-icons/io5"

export default function HomeLink(){
    return(
        <Link to = '/' className="home-link">
            <i> <IoHome />  </i>
            <span> Accueil </span>
        </Link>
    )
}