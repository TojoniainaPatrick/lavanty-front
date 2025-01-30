import { Input, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";

export default function UpdateProduct({ open, setOpen }){

    const {
        getTypes,
        types,
        getProducts,
        currentProduct,
        setCurrentProduct
    } = useAppContext()

    useEffect(() => {
        getTypes()
    }, [])

    const [ file, setFile ] = useState( null )
    const imageInputRef = useRef()

    const closeModal = _=> {
        setOpen( false )
        setCurrentProduct({})
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
        if( !currentProduct.productName ){
            Swal.fire({
                icon: "warning",
                title: "Modification de produit",
                text: "Merci de bien vouloir indiquer la désignation!",
            });
        }
        else if( !currentProduct.typeId ){
            Swal.fire({
                icon: "warning",
                title: "Modification de produit",
                text: "Merci de bien vouloir choisir un type!",
            });
        }
        else if( !currentProduct.productDescription ){
            Swal.fire({
                icon: "warning",
                title: "Modification de produit",
                text: "Merci de bien vouloir décrire le produit!",
            });
        }
        else{
            
            
            await axios.put(`/product/update/${ currentProduct.productId }`, currentProduct )
            .then( async _ => {

                if( file ){

                    const formData = new FormData();
                    formData.append('file', file );

                    await axios.put(`/product/update-image/${ currentProduct.productId }`, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
                }

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
        setCurrentProduct({ ...currentProduct, [ id ]: value })
    }

    return(
        <>
            <Modal
                open = { open }
                title = 'Modification de produit'
                okText = 'Modifier'
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
                    src = { file ? URL.createObjectURL( file ) : currentProduct.productImageURl }
                    onClick = { () => imageInputRef.current.click() }
                    style={{ height: 150, objectFit: 'cover', margin: 'auto' }}
                />

                <input onChange = { changeProductImage } style={{ display: 'none'}} type="file" className="custom-image-input" ref = { imageInputRef } />

                <Input
                    currentProduct="text"
                    id="productName"
                    placeholder="Désignation"
                    onChange = { handleChangeInput }
                    value = { currentProduct.productName }
                />

                <Select
                    style = {{ width: '100%', marginTop: 20, textAlign: 'start' }}
                    placeholder = "Catégorie"
                    showSearch
                    options = {
                        [{ label: 'Selectionnez le type', value: ''}]
                        .concat( types.map( category => ({
                            label: category.typeName,
                            value: category.typeId
                        })))
                    }
                    onChange = { value => setCurrentProduct({ ...currentProduct, typeId: value }) }
                    value = { currentProduct.typeId || '' }
                />

                <Input.TextArea
                    placeholder = "Description du produit"
                    style = {{ marginTop: 20 }}
                    onChange = { e => setCurrentProduct({ ...currentProduct, productDescription: e.target.value }) }
                    value = { currentProduct.productDescription || '' }
                />

            </Modal>
        </>
    )
}