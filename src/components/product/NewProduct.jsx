import { Input, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";
import defaultImage from '../../assets/images/defaultProductImage.png'

export default function NewProduct(){

    const {
        getTypes,
        types,
        getProducts
    } = useAppContext()

    useEffect(() => {
        getTypes()
    }, [])

    const [ open, setOpen ] = useState( false )
    const [ file, setFile ] = useState( null )
    const imageInputRef = useRef()

    const [ product, setProduct ] = useState({
        productName: "",
        typeId: "",
        productDescription: ""
    })

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setProduct({
            productName: "",
            typeId: "",
            productDescription: ""
        })
        setFile( null )
    }
    
    const changeProductImage = async event => {
        try {
    
            const image = event.target.files?.[0];
            if( !image ) return;
    
            setFile( image )
    
        } catch (error) {
            console.log( error )
        }
    }

    const confirm = async () => {
        if( !file ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau produit",
                text: "Merci de bien vouloir télécharger une image!",
            });
        }
        else if( !product.productName ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau produit",
                text: "Merci de bien vouloir indiquer la désignation!",
            });
        }
        else if( !product.typeId ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau produit",
                text: "Merci de bien vouloir choisir un type!",
            });
        }
        else if( !product.productDescription ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau produit",
                text: "Merci de bien vouloir décrire le produit!",
            });
        }
        else{
            
            const formData = new FormData();

            formData.append('file', file );

            Object.entries(product).map(([key, value]) => {
                formData.append( key, value )
            })
            
            await axios.post('/product/insert', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getProducts()
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

    const handleChangeInput = e => {
        const{ id, value } = e.target
        setProduct({ ...product, [ id ]: value })
    }

    return(
        <>
            <button className="blue-button" onClick = { openModal }>
                <i> <CiSquarePlus /> </i> Ajouter un produit
            </button>

            <Modal
                open = { open }
                title = 'Nouveau produit'
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
                style={{ textAlign: 'center'}}
            >
                <img
                    src = { file ? URL.createObjectURL( file ) : defaultImage } onClick = { () => imageInputRef.current.click() }
                    style={{ height: 150, objectFit: 'cover', margin: 'auto' }}
                />

                <input
                    onChange = { changeProductImage }
                    style={{ display: 'none'}}
                    type="file"
                    className="custom-image-input"
                    ref = { imageInputRef }
                />

                <Input
                    product="text"
                    id="productName"
                    placeholder="Désignation"
                    onChange = { handleChangeInput }
                    value = { product.productName }
                />

                <Select
                    style = {{ width: '100%', marginTop: 20, textAlign: 'start' }}
                    placeholder = "Type du produit"
                    showSearch
                    options = {
                        [{ label: 'Selectionnez le type', value: ''}]
                        .concat( types.map( type => ({
                            label: type.typeName,
                            value: type.typeId
                        })))
                    }
                    onChange = { value => setProduct({ ...product, typeId: value }) }
                    value = { product.typeId || '' }
                />

                <Input.TextArea
                    placeholder = "Description du produit"
                    style = {{ marginTop: 20 }}
                    onChange = { e => setProduct({ ...product, productDescription: e.target.value }) }
                    value = { product.productDescription || '' }
                />

            </Modal>
        </>
    )
}