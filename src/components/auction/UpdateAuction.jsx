import { DatePicker, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";
import dayjs from "dayjs";

export default function UpdateAuction({ open, setOpen }){

    const {
        getProducts,
        products,
        getAuctions,
        currentAuction,
        setCurrentAuction
    } = useAppContext()

    useEffect(() => {
        getProducts()
    }, [])

    const closeModal = _=> {
        setOpen( false )
        setCurrentAuction({
            auctionStartingPrice: "",
            auctionStartDate: "",
            auctionEndDate: "",
            productId: ""
        })
    }

    const confirm = async _ => {
        if( !currentAuction.productId ){
            Swal.fire({
                icon: "warning",
                title: "Modificatoin d'annonce",
                text: "Merci de bien vouloir choisir un produit!",
            });
        }
        else if( !currentAuction.auctionStartingPrice ){
            Swal.fire({
                icon: "warning",
                title: "Modificatoin d'annonce",
                text: "Merci de bien vouloir indiquer le prix de départ!",
            });
        }
        else if( !currentAuction.auctionStartDate ){
            Swal.fire({
                icon: "warning",
                title: "Modificatoin d'annonce",
                text: "Merci de bien vouloir indiquer la date de début de la vente!",
            });
        }
        else if( !currentAuction.auctionEndDate ){
            Swal.fire({
                icon: "warning",
                title: "Modificatoin d'annonce",
                text: "Merci de bien vouloir indiquer la date d'expiration de la vente!",
            });
        }
        else{
            await axios.put(`/auction/update/${ currentAuction.auctionId }`, currentAuction )
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
        setCurrentAuction({ ...currentAuction, auctionStartDate: dateString })
    };

    const onChangeEndDate = (date, dateString) => {
        setCurrentAuction({ ...currentAuction, auctionEndDate: dateString })
    };

    return(
        <>
            <Modal
                open = { open }
                title = "Modificatoin d'annonce"
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
                    onChange = { value => setCurrentAuction({ ...currentAuction, productId: value }) }
                    value = { currentAuction.productId || '' }
                />

                <Input
                    style = {{ width: '100%', marginTop: 20 }}
                    type="text"
                    id="auctionStartingPrice"
                    placeholder="Prix de départ"
                    onChange = { event => {
                        if( /^\d{0,12}$/.test( event.target.value )) setCurrentAuction({ ...currentAuction, auctionStartingPrice: event.target.value})
                    }}
                    value = { currentAuction.auctionStartingPrice }
                />

                <DatePicker
                    id="auctionStartDate"
                    placeholder = "Début de vente"
                    style = {{ width: '100%', marginTop: 20 }}
                    onChange = { onChangeStartDate }
                    value = { dayjs( currentAuction.auctionStartDate )}
                    minDate = { dayjs() }
                />

                <DatePicker
                    id="auctionStartDate"
                    placeholder = "Expiration de vente"
                    style = {{ width: '100%', marginTop: 20 }}
                    onChange = { onChangeEndDate }
                    minDate = { dayjs().add( 2, 'day' )}
                    value = { dayjs( currentAuction.auctionEndDate )}
                />

            </Modal>
        </>
    )
}