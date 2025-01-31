import { Image } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function AuctionCard({ auction }) {

    const navigate = useNavigate()

    return(
        <div className="auction-card">

            <div className="auction-card-image">
                <Image src = { auction.product?.productImageURl } width = { 200 } height = { 150 } alt = "Image du produit"/>
            </div>

            <div className="auction-card-info">
                <span className="product-name"> { auction?.product?.productName } </span>
                <p className="product-description"> { auction?.product?.productDescription } </p>
                <span className="product-price"> { auction?.auctionCurrentPrice ?? auction?.auctionStartingPrice } Ar </span>
                <button onClick = { _=> navigate(`/app/details/${ auction.auctionId }`)}>
                    <i> <BsInfoCircle /> </i>
                    <span> Découvrir </span>
                </button>
            </div>

        </div>
    )
}