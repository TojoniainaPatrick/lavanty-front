import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MyAccount() {
    return(
        <div className="important-information">

            <div className="footer-item-title"> <span> MON COMPTE </span> </div>

            <div className="footer-item-list">

                <ul>
                   <li> <Link to = "/login"> <i> <MdKeyboardArrowRight /> </i> <span>Se connecter</span> </Link>  </li>
                   <li> <Link to = "/register"> <i> <MdKeyboardArrowRight /> </i> <span>S'inscrire</span> </Link>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>À propos</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Contactez-nous</span> </li>
                </ul>

            </div>
        </div>
    )
}


