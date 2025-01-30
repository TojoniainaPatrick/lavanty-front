import Description from "./footer/Description";
import ImportantInformation from "./footer/ImportantInformation";
import MyAccount from "./footer/MyAccount";
import NewsLetter from "./footer/NewsLetter";
import paymentLogo from '../assets/images/payments.png'

export default function AppFooter() {
    return(
        <div className="app-footer">

            <div className="footer-top">

                <Description />
                <ImportantInformation />
                <MyAccount />
                <NewsLetter />

            </div>

            <div className="footer-bottom">

                <p>
                    © Site. All Rights Reserved. Designed by e-workpro
                </p>

                <img src = { paymentLogo } alt = "paiement logo" />

            </div>

        </div>
    )
}