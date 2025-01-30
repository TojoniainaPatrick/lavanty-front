import AppPageTitle from "../../components/AppPageTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Avatar, Button, Input, Space, Table } from 'antd'
const { Search } = Input
import Swal from 'sweetalert2'
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { auctionsTableColumns } from "../../constant/tableColumns";
import NewAuction from "../../components/auction/NewAuction";
import { GrAnnounce } from "react-icons/gr";
import UpdateAuction from "../../components/auction/UpdateAuction";
import dayjs from "dayjs";

export default function Auctions() {

    const {
        auctions,
        getAuctions,
        setCurrentAuction
    } = useAppContext()

    useEffect(() => {
        getAuctions()
    }, [])

    const [ searchText, setSearchText ] = useState("")

    const [ openUpdate, setOpenUpdate ] = useState( false )

    const searchedData = auctions.filter( auction =>
        auction.product?.productName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        auction.auctionStartingPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        auction.auctionCurrentPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        auction.auctionStatus?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        dayjs(auction.auctionStartDate).format("DD/MM/YYYY").toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        dayjs(auction.auctionEndDate).format("DD/MM/YYYY").toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        auction.product?.type?.category?.categoryName?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
    )
    
    const handleOpenUpdate = ( auction ) => {
        setCurrentAuction( auction )
        setOpenUpdate( true )
    }
    const deleteAuction = async  auctionId  => {
       
        Swal.fire({
            title: "Suppression",
            text: "Souhaitez-vous continuer la suppression?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Continuer",
            cancelButtonText: "Annuler",
            reverseButtons: true
        }).then( async result => {
            if (result.isConfirmed) {
                await axios.delete(`/auction/delete/${ auctionId }`)
                .then( _ => {
                    getAuctions()
                    Swal.fire({
                        title: "Suppression",
                        text: "Suppression effectuée avec succès!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch( error => {
                    if( error?.response?.data?.message ){
                        Swal.fire({
                            title: "Suppression",
                            text: error?.response?.data?.message,
                            icon: "error"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "Suppression",
                            text: error.message,
                            icon: "error"
                        });
                    }
                })
            } 
        });
    }

    return(
        <>
            <UpdateAuction open = { openUpdate } setOpen = { setOpenUpdate } />

            <div className="auctions-page main-page">

                <AppPageTitle icon = { <GrAnnounce /> } title = "Annonces" />

                <div className="app-page-header">
                    <Search
                        style = {{ width: 250 }}
                        onChange = { e => setSearchText( e.target.value )}
                    />
                    <NewAuction />
                </div>

                <div className="app-page-body">
                    <Table
                        columns = { auctionsTableColumns }
                        bordered
                        dataSource = {
                            searchedData.map((auction, key) =>({
                                ...auction,
                                key,
                                productName:
                                <Space>
                                    <Avatar alt = "Photo du produit" src = { auction.product?.productImageURl } />
                                    <span> { auction.product?.productName } </span>
                                </Space>,
                                auctionCurrentPrice: auction.auctionCurrentPrice ?? 0,
                                auctionStartDate: dayjs(auction.auctionStartDate).format("DD/MM/YYYY"),
                                auctionEndDate: dayjs(auction.auctionEndDate).format("DD/MM/YYYY"),
                                auctionStatus: auction.auctionStatus,
                                bidsCount: auction.bids?.length,
                                action:
                                <Space>

                                    <Button
                                        type="primary"
                                        icon = { <MdEdit /> }
                                        onClick = { () => handleOpenUpdate( auction )}
                                        style = {{
                                            background: 'var( --blue-light-active )'
                                        }}
                                    />

                                    <Button
                                        type="primary"
                                        icon = { <RiDeleteBin6Line /> }
                                        onClick = { () => deleteAuction( auction. auctionId  )}
                                        style = {{
                                            background: 'var( --yellow )',
                                            color: 'var( --blue-light-hover)',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </Space>
                            })
                            )
                        }
                        scroll={{
                            y: 'calc( 100vh - 250px )'
                        }}
                        style={{ width: '80vw' }}
                    />
                </div>

                </div>
        </>
    )
}