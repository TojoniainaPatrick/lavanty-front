import { MdDashboard, MdOutlineSell } from "react-icons/md";
import AppPageTitle from "../../components/AppPageTitle";
import useAppContext from "../../hooks/useAppContext";
import { useEffect } from "react";
import { ImHammer2 } from "react-icons/im";
import { IoMdCart } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import AuctionChart from "../../components/dashboard/AuctionChart";

export default function Dashboard() {

    const {
        products,
        auctions,
        bids,
        categories,
        getCategories,
        getAuctions,
        getBids,
        getProducts
    } = useAppContext()

    useEffect(() => {
        getProducts()
        getBids()
        getAuctions()
        getCategories()
    }, [])

    return(
        <div className="dashboard-page main-page">

            <AppPageTitle icon = { <MdDashboard /> } title = "Dashborad" />

            <div className="card-container">

                <div className="dashboard-card">
                    <span className="icon"><i> <MdOutlineSell color="var(--dark-yellow)" size = { 25 } /> </i></span>
                    <span className="title"> Catégories </span>
                    <span className="value"> { categories.length } </span>
                </div>

                <div className="dashboard-card">
                    <span className="icon"><i> <IoMdCart color="var(--dark-yellow)" size = { 25 } /> </i></span>
                    <span className="title"> Produits </span>
                    <span className="value"> { products.length } </span>
                </div>

                <div className="dashboard-card">
                    <span className="icon"><i> <GrAnnounce color="var(--dark-yellow)" size = { 25 } /> </i></span>
                    <span className="title"> Annonces </span>
                    <span className="value"> { auctions.length } </span>
                </div>

                <div className="dashboard-card">
                    <span className="icon"><ImHammer2 color="var(--dark-yellow)" size = { 25 } /></span>
                    <span className="title"> Enchères </span>
                    <span className="value"> { bids.length } </span>
                </div>

            </div>

            <div className="chart-container">
                <AuctionChart bids = { bids } />
            </div>

        </div>
    )
}