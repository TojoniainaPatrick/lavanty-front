import { MdKeyboardArrowRight } from "react-icons/md";

export default function ImportantInformation() {
    return(
        <div className="important-information">

            <div className="footer-item-title"> <span> INFORMATIONS UTILES </span> </div>

            <div className="footer-item-list">

                <ul>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Accueil</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Politique de Confidentialité</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span>Conditions d’utilisation</span>  </li>
                   <li> <i> <MdKeyboardArrowRight /> </i> <span> Produits et services</span> </li>
                </ul>

            </div>
        </div>
    )
}