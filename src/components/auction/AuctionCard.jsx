import { Image } from "antd";

export default function AuctionCard({ auction }) {
    return(
        <div className="auction-card">

            <div className="auction-card-image">
                <Image src = { auction.product?.productImageURl } alt = "Image du produit"/>
            </div>

            <div className="auction-card-info">
                <span> { auction?.product?.productName } </span>
                <p> { auction?.product?.productDescription } </p>
                <span> { auction?.auctionCurrentPrice ?? auction?.auctionStartingPrice } Ar </span>
                <button> Découvrir </button>
            </div>

        </div>
    )
}