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
import { GrAnnounce } from "react-icons/gr";
import dayjs from "dayjs";

export default function Bids() {

    const {
        bids,
        getBids,
        setCurrentBid
    } = useAppContext()

    useEffect(() => {
        getBids()
    }, [])

    const [ searchText, setSearchText ] = useState("")

    const searchedData = bids.filter( bid =>
        bid.auction?.product?.productName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        bid.user?.userName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        bid.bidAmount?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        bid.auctionCurrentPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        bid.bidStatus?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) 
    )

    const deleteBid = async  bidId  => {
       
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
                await axios.delete(`/bid/delete/${ bidId }`)
                .then( _ => {
                    getBids()
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
            <div className="bids-page main-page">

                <AppPageTitle icon = { <GrAnnounce /> } title = "Enchères" />

                <div className="app-page-header">
                    <Search
                        style = {{ width: 250 }}
                        onChange = { e => setSearchText( e.target.value )}
                    />
                </div>

                <div className="app-page-body">
                    <Table
                        columns = { auctionsTableColumns }
                        bordered
                        dataSource = {
                            searchedData.map((bid, key) =>({
                                ...bid,
                                key,
                                buyer:
                                <Space>
                                    <Avatar alt = "Photo de profil de l'acheteur" src = { bid.user?.userPictureURl } />
                                    <span> { bid.user?.userName } </span>
                                </Space>,
                                productName:
                                <Space>
                                    <Avatar alt = "Photo du produit" src = { bid.product?.productImageURl } />
                                    <span> { bid.product?.productName } </span>
                                </Space>,
                                bidDate: dayjs(bid.createdAt).format("DD/MM/YYYY"),
                                action:
                                <Space>

                                    <Button
                                        type="primary"
                                        icon = { <RiDeleteBin6Line /> }
                                        onClick = { () => deleteBid( bid. bidId  )}
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