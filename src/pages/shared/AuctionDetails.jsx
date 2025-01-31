import { useEffect, useState } from "react"
import AuctionCard from "../../components/auction/AuctionCard"
import AppPageTitle from "../../components/AppPageTitle"
import { BsInfoCircle } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import axios from "../../api/axios"
import { Image } from "antd"
import { ImHammer2 } from "react-icons/im";
import dayjs from "dayjs"
import Swal from "sweetalert2"

export default function AuctionDetails() {

    const { auctionId  } = useParams()
    const [ auction, setAuction ] = useState({})

    const user = JSON.parse( localStorage.getItem('user'))

    const [ bid, setBid ] = useState({
        bidAmount: ""
    })

    useEffect(() => {

        const getAuctionById = async ( id ) => {
            await axios(`/auction/by-id/${ id }`)
            .then( response => setAuction( response.data.data ))
            .catch( error => console.log( error ))
        }

        getAuctionById( auctionId )

    }, [])

    const toBid = async () => {
        if( !bid.bidAmount ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle enchère",
                text: "Merci de bien vouloir indiquer un montant!",
            });
        }
        else if(
            auction.auctionStartingPrice &&
            Number( auction.auctionStartingPrice ) >= Number(bid.bidAmount) 
        ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle enchère",
                text: "Merci de bien vouloir indiquer un prix supérieur au prix de départ!",
            });
        }
        else if(
            auction.auctionCurrentPrice &&
            Number( auction.auctionCurrentPrice ) >= Number(bid.bidAmount) 
        ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle enchère",
                text: "Merci de bien vouloir indiquer un prix supérieur au prix actuel!",
            });
        }
        else{
            await axios.post('bid/insert', {
                ...bid,
                userId: user?.userId,
                auctionId: auction.auctionId
            })
            .then( response => {
                setBid({ bidAmount: "" })
                Swal.fire({
                    icon: "success",
                    title: "Nouvelle enchère",
                    text: "Nouvelle enchère placée avec succès!",
                });
            })
            .catch( error => {
                if( error?.response?.data?.message ){
                    Swal.fire({
                        icon: "error",
                        title: error?.response?.data?.message,
                    });
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: error.message,
                    });
                }
                console.log( error )
            })
        }
    }

    return(
        <div className="app-auctions">

            <AppPageTitle icon = { <BsInfoCircle /> } title = "Detail d'une annonce" />

            <div className="auction-details">

                <div className="auction-product-image">
                    <Image src = { auction.product?.productImageURl } alt = 'Image du produit' />
                </div>

                <div className="auction-details-section">

                    <span className="auction-product-name"> { auction?.product?.productName } </span>

                    <p className="auction-product-description"> { auction?.product?.productDescription } </p>
                    
                    <span className="auction-product-price"> { auction?.auctionCurrentPrice ?? auction?.auctionStartingPrice } Ar </span>

                    <hr />

                    {
                        user
                        ?
                        <div className="auction-input-group">

                            <input
                                type="text"
                                value = { bid.bidAmount }
                                placeholder = "Misez un prix"
                                onChange = { event => {
                                    if( /^\d{0,12}$/.test(event.target.value)) setBid({ ...bid, bidAmount: event.target.value })
                                }}
                            />

                            <button onClick = { toBid }>
                                <i> <ImHammer2 /> </i>
                                <span> Placer une enchère  </span>
                            </button>

                        </div>
                        :
                        <div className="to-bid">
                            <span> Placez vos enchères </span>
                            <p>
                                Vous devez être connecté pour placer une mise.
                                <Link to = "/login"> Se connecter </Link> ou <Link to = '/register'> S'inscrire </Link>
                            </p>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}