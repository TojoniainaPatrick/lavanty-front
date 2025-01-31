import { useEffect, useState } from "react"
import useAppContext from "../../hooks/useAppContext"
import AuctionCard from "../../components/auction/AuctionCard"
import Search from "antd/es/input/Search"
import { Select } from "antd"
import AppPageTitle from "../../components/AppPageTitle"
import { GrAnnounce } from "react-icons/gr";
import HomeLink from "../../components/HomeLink"

export default function AppAuctions() {

    const {
        getAuctions,
        auctions,
        categories,
        getCategories
    } = useAppContext()

    const [ selectedCategory, setSelectedCategory ] = useState( null )
    const [searchText, setSearchText ] = useState("")

    const auctionsByCategory = selectedCategory
    ? auctions.filter( auction => auction.product?.type?.categoryId == selectedCategory )
    : auctions

    const searchedData = auctionsByCategory.filter( auction =>
        auction.product?.productName?.toString().toLowerCase().includes( searchText.toString().toLocaleLowerCase()) ||
        auction.product?.productDescription?.toString().toLowerCase().includes( searchText.toString().toLocaleLowerCase()) ||
        auction.product?.type?.typeName?.toString().toLowerCase().includes( searchText.toString().toLocaleLowerCase()) ||
        auction.auctionStartingPrice?.toString().toLowerCase().includes( searchText.toString().toLocaleLowerCase()) ||
        auction.auctionCurrentPrice?.toString().toLowerCase().includes( searchText.toString().toLocaleLowerCase())
    )

    useEffect(() => {
        getAuctions()
        getCategories()
    }, [])

    return(
        <div className="app-auctions">

            <HomeLink />

            <AppPageTitle icon = { <GrAnnounce /> } title = "Annonces" />

            <div className="app-auctions-header">

                <Select
                    placeholder = "Catégorie"
                    showSearch
                    options = {
                        [{ label: 'Toutes les catégories', value: '' }]
                        .concat( categories.map( category => ({
                            label: category.categoryName,
                            value: category.categoryId
                        })))
                    }
                    onChange = { value => setSelectedCategory( value ) }
                    style={{ width: 250 }}
                />

                <Search
                    placeholder="Recherche ..."
                    value = { searchText }
                    allowClear
                    onChange = { event => setSearchText( event.target.value )}
                    style={{ width: 250 }}
                />

            </div>

            <div className="app-auctions-data">
                {
                    searchedData.map(( auction, key ) =>
                        <AuctionCard key = { key } auction = { auction } />
                    )
                }
            </div>

        </div>
    )
}