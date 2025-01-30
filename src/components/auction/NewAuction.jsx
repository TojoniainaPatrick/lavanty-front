import { DatePicker, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";
import dayjs from "dayjs";

export default function NewAuction(){

    const {
        getProducts,
        products,
        getAuctions
    } = useAppContext()

    useEffect(() => {
        getProducts()
    }, [])

    const [ open, setOpen ] = useState( false )

    const [ auction, setAuction ] = useState({
        auctionStartingPrice: "",
        auctionStartDate: "",
        auctionEndDate: "",
        productId: ""
    })

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setAuction({
            auctionStartingPrice: "",
            auctionStartDate: "",
            auctionEndDate: "",
            productId: ""
        })
    }

    const confirm = async _ => {
        if( !auction.productId ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle annonce",
                text: "Merci de bien vouloir choisir un produit!",
            });
        }
        else if( !auction.auctionStartingPrice ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle annonce",
                text: "Merci de bien vouloir indiquer le prix de départ!",
            });
        }
        else if( !auction.auctionStartDate ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle annonce",
                text: "Merci de bien vouloir indiquer la date de début de la vente!",
            });
        }
        else if( !auction.auctionEndDate ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle annonce",
                text: "Merci de bien vouloir indiquer la date d'expiration de la vente!",
            });
        }
        else{
            await axios.post('/auction/insert', auction )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getAuctions()
                closeModal()
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

    const onChangeStartDate = (date, dateString) => {
        setAuction({ ...auction, auctionStartDate: dateString })
    };

    const onChangeEndDate = (date, dateString) => {
        setAuction({ ...auction, auctionEndDate: dateString })
    };

    return(
        <>
            <button className="blue-button" onClick = { openModal }>
                <i> <CiSquarePlus /> </i> Publier une annonce
            </button>

            <Modal
                open = { open }
                title = 'Nouvevelle annonce'
                okText = 'Ajouter'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                okButtonProps={{ style: {
                    color: "white",
                    background: 'var( --blue )'
                }}}
                cancelButtonProps={{ style: {
                    color: "white",
                    background: 'var( --blue )'
                }}}
                centered
            >

                <Select
                    style = {{ width: '100%', marginTop: 20 }}
                    placeholder = "Produit"
                    showSearch
                    options = {
                        [{ label: 'Selectionnez la un produit', value: ''}]
                        .concat( products.map( product => ({
                            label: product.productName,
                            value: product.productId
                        })))
                    }
                    onChange = { value => setAuction({ ...auction, productId: value }) }
                    value = { auction.productId || '' }
                />

                <Input
                    style = {{ width: '100%', marginTop: 20 }}
                    auction="text"
                    id="auctionStartingPrice"
                    placeholder="Prix de départ"
                    onChange = { event => {
                        if( /^\d{0,12}$/.test( event.target.value )) setAuction({ ...auction, auctionStartingPrice: event.target.value})
                    }}
                    value = { auction.auctionStartingPrice }
                />

                <DatePicker
                    id="auctionStartDate"
                    placeholder = "Début de vente"
                    style = {{ width: '100%', marginTop: 20 }}
                    onChange = { onChangeStartDate }
                    minDate = { dayjs() }
                />

                <DatePicker
                    id="auctionStartDate"
                    placeholder = "Expiration de vente"
                    style = {{ width: '100%', marginTop: 20 }}
                    onChange = { onChangeEndDate }
                    minDate = { dayjs().add( 2, 'day' )}
                />

            </Modal>
        </>
    )
}