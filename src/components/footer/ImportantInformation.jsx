import { MdKeyboardArrowRight } from "react-icons/md";
import {Link} from 'react-router-dom'

export default function ImportantInformation() {
    return(
        <div className="important-information">

            <div className="footer-item-title"> <span> INFORMATIONS UTILES </span> </div>

            <div className="footer-item-list">

                <ul>
                   <li> <Link to = "/"> <i> <MdKeyboardArrowRight /> </i> <span>Accueil</span> </Link>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Politique de Confidentialité</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Conditions d’utilisation</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span> Produits et services</span> </li>
                </ul>

            </div>
        </div>
    )
}