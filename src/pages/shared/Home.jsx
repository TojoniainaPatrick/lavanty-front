import { GrLogin } from 'react-icons/gr'
import logo from '../../assets/images/blue-logo.jpg'
import { FaRegStar, FaRegCheckCircle, FaLock } from "react-icons/fa"
import ProfilePopover from '../../components/ProfilePopover'
import AppFooter from '../../components/AppFooter'
import { FaAnchor } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
import { MdChair } from "react-icons/md";
import { FaFootball } from "react-icons/fa6";
import { Outlet, useNavigate } from 'react-router-dom'
import useAppContext from '../../hooks/useAppContext'


export const HomeStack = () => {

    const { user } = useAppContext()
    const navigate = useNavigate()

    return(
        <div className="home-page">

            <div className="home-page-header">

                <img src = { logo } alt = "Lavanty.mg logo" />

                {
                    user
                    ?
                    <ProfilePopover />
                    :
                    <button onClick = { _ => navigate("/login")}>
                        <i> <GrLogin /> </i>
                        <span> Se connecter </span> 
                    </button>
                }

            </div>

            <div className="homestack-body">
                <Outlet />
            </div>

            <AppFooter />

        </div>
    )
}

export default function Home() {

    const navigate = useNavigate()
    const goToAuctions = _ => navigate("/app/auctions")

    return(
        <>
            <div className="home-page-banner">

                <div className='text'>
                    <p>
                        La référence des ventes aux enchères en ligne des biens des mairies des organismes publics et des grandes entreprises 
                    </p>
                </div>

                <div className='info'>
                    <div className='info-item'>
                        <i> <FaRegStar /> </i>
                        <span>Ventes exclusives</span>
                    </div>
                    <div className='info-item'>
                        <i> <FaRegCheckCircle /> </i>
                        <span> Vendeurs et produits certifiés</span>
                    </div>
                    <div className='info-item'>
                        <i> <FaLock /> </i>
                        <span> Achats simples et sécurisés</span>
                    </div>
                </div>

            </div>

            <div className="home-page-body">

                <div className="category-card">
                    <div className="card-layer one"></div>
                    <div className="card-info">
                        <span className = 'title'> Immobilier </span>
                        <span className = 'sales'> 49 ventes en cours </span>
                        <button onClick = { goToAuctions }> Découvrir </button>
                    </div>
                </div>

                <div className="category-card">
                    <div className="card-layer two"></div>
                    <div className="card-info">
                        <span className = 'title'> Véhicules & Equipements </span>
                        <span className = 'sales'> 112 ventes en cours </span>
                        <button onClick = { goToAuctions }> Découvrir </button>
                    </div>
                </div>

                <div className="category-card">
                    <div className="card-layer three"></div>
                    <div className="card-info">
                        <span className = 'title'> Matériels informatiques </span>
                        <span className = 'sales'> 264 ventes en cours </span>
                        <button onClick = { goToAuctions }> Découvrir </button>
                    </div>
                </div>

            </div>

            <div className='category-paragraph'>
                Nos autres catégories
            </div>

            <div className="home-page-section">

                <div className="category-card-alternate" onClick = { goToAuctions }>
                   <i> <FaAnchor size = { 26 } /> </i>
                   <span className='auther-category-title'> Nautisme </span>
                   <span className='auther-category-counts'> 14 articles </span>
                </div>

                <div className="category-card-alternate" onClick = { goToAuctions }>
                   <i> <CgScreen size = { 26 } /> </i>
                   <span className='auther-category-title'> Multimédia </span>
                   <span className='auther-category-counts'> 52 articles </span>
                </div>

                <div className="category-card-alternate" onClick = { goToAuctions }>
                   <i> <MdChair size = { 26 } /> </i>
                   <span className='auther-category-title'> Mobilier </span>
                   <span className='auther-category-counts'> 36 articles </span>
                </div>

                <div className="category-card-alternate" onClick = { goToAuctions }>
                   <i> <FaFootball size = { 26 } /> </i>
                   <span className='auther-category-title'> Sports et Loisirs </span>
                   <span className='auther-category-counts'> 27 articles </span>
                </div>

            </div>
        </>
    )
}