import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

export default function NewsLetter() {
    return(
        <div className="footer-newsletter">
            
            <div className="footer-item-title"> <span> MON COMPTE </span> </div>
            
            <div className="footer-item-description">
                <p>
                    Abonnez-vous à notre newsletter pour rester 
                    informé des dernières nouvelles et offres exclusives.
                </p>
            </div>

            <div className="input-group">
                <input type="email" placeholder="Votre adresse e-mail"/>
                <button>Sign Up</button>
            </div>

            <div className="footer-item-title"> <span> NOUS SUIVRE </span> </div>

            <div className="social-media">
                <span> <i> <FaTwitter /> </i> </span>
                <span> <i> <FaFacebookF /> </i> </span>
                <span> <i> <FaLinkedinIn /> </i> </span>
                <span> <i> <FaInstagram /> </i> </span>
            </div>

        </div>
    )
}