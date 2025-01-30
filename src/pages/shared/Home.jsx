import { GrLogin } from 'react-icons/gr'
import logo from '../../assets/images/blue-logo.jpg'
import { FaRegStar, FaRegCheckCircle, FaLock } from "react-icons/fa"
import ProfilePopover from '../../components/ProfilePopover'
import { useState } from 'react'
import AppFooter from '../../components/AppFooter'
import { FaAnchor } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
import { MdChair } from "react-icons/md";
import { FaFootball } from "react-icons/fa6";
import { Outlet } from 'react-router-dom'


export const HomeStack = () => {

    const [ user, setUser ] = useState( JSON.parse( localStorage.getItem('user' )))

    return(
        <div className="home-page">

            <div className="home-page-header">

                <img src = { logo } alt = "Lavanty.mg logo" />

                {
                    user
                    ?
                    <ProfilePopover profileLink="/app/profile" />
                    :
                    <button>
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

                <div className="category-card one">
                    <span className = 'title'> Immobilier </span>
                    <span className = 'sales'> 49 ventes en cours </span>
                    <button> Découvrir </button>
                </div>

                <div className="category-card two">
                    <span className = 'title'> Véhicules & Equipements </span>
                    <span className = 'sales'> 112 ventes en cours </span>
                    <button> Découvrir </button>
                </div>

                <div className="category-card three">
                    <span className = 'title'> Matériels informatiques </span>
                    <span className = 'sales'> 264 ventes en cours </span>
                    <button> Découvrir </button>
                </div>

            </div>

            <div className='category-paragraph'>
                Nos autres catégories
            </div>

            <div className="home-page-section">

                <div className="category-card-alternate">
                   <i> <FaAnchor size = { 26 } /> </i>
                   <span className='auther-category-title'> Nautisme </span>
                   <span className='auther-category-counts'> 14 articles </span>
                </div>

                <div className="category-card-alternate">
                   <i> <CgScreen size = { 26 } /> </i>
                   <span className='auther-category-title'> Multimédia </span>
                   <span className='auther-category-counts'> 52 articles </span>
                </div>

                <div className="category-card-alternate">
                   <i> <MdChair size = { 26 } /> </i>
                   <span className='auther-category-title'> Mobilier </span>
                   <span className='auther-category-counts'> 36 articles </span>
                </div>

                <div className="category-card-alternate">
                   <i> <FaFootball size = { 26 } /> </i>
                   <span className='auther-category-title'> Sports et Loisirs </span>
                   <span className='auther-category-counts'> 27 articles </span>
                </div>

            </div>
        </>
    )
}