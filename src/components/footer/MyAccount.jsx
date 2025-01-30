import { MdKeyboardArrowRight } from "react-icons/md";

export default function MyAccount() {
    return(
        <div className="important-information">

            <div className="footer-item-title"> <span> MON COMPTE </span> </div>

            <div className="footer-item-list">

                <ul>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Se connecter</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>S'inscrire</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>À propos</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Contactez-nous</span> </li>
                </ul>

            </div>
        </div>
    )
}


