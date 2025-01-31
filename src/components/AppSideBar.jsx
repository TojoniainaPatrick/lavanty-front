import { NavLink } from 'react-router-dom'
import blueLogo from '../assets/images/blue-logo.jpg'
import { MdDashboard, MdOutlineCategory, MdOutlineSell } from 'react-icons/md'
import { IoMdCart } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { ImHammer2 } from 'react-icons/im';

export default function AppSideBar () {
    return(
        <nav className="side-bar">
            <div className="side-bar-header">
                <img src = { blueLogo } alt = "logo lavanty" />
            </div>
            <div className="side-bar-content">
                <ul>
                    <li>
                        <NavLink to = "/admin/dashboard">
                            <i> <MdDashboard /> </i>
                            <span> Dashboard </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/categories">
                            <i> <MdOutlineSell /> </i>
                            <span> Catégorie </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/types">
                            <i> <MdOutlineCategory /> </i>
                            <span> Types </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/products">
                            <i> <IoMdCart /> </i>
                            <span> Produits </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/auctions">
                            <i> <GrAnnounce /> </i>
                            <span> Annonces </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/bids">
                            <i> <ImHammer2 /> </i>
                            <span> Enchères </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to = "/admin/users">
                            <i> <FaUsersBetweenLines /> </i>
                            <span> Utilisateurs </span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to = "/admin/settings">
                            <i> <AiFillAndroid /> </i>
                            <span> Paramètres </span>
                        </NavLink>
                    </li> */}

                </ul>
            </div>
        </nav>
    )
}