import { Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";

export default function UpdateType({ open, setOpen }){

    const {
        getCategories,
        categories,
        getTypes,
        currentType,
        setCurrentType
    } = useAppContext()

    useEffect(() => {
        getCategories()
    }, [])

    const closeModal = _=> {
        setOpen( false )
        setCurrentType({
            typeName: "",
            categoryId: ""
        })
    }

    const confirm = async _ => {
        if( !currentType.typeName ){
            Swal.fire({
                icon: "warning",
                title: "Modification de type de produit",
                text: "Merci de bien vouloir indiquer la désignation!",
            });
        }
        else if( !currentType.categoryId ){
            Swal.fire({
                icon: "warning",
                title: "Modification de type de produit",
                text: "Merci de bien vouloir choisir une catégorie!",
            });
        }
        else{
            await axios.put(`/type/update/${ currentType.typeId }`, currentType )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getTypes()
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
        setType({ ...type, [ id ]: value })
    }

    return(
        <>
            <Modal
                open = { open }
                title = 'Modification de type de produit'
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
            >

                <Input
                    type="text"
                    id="typeName"
                    placeholder="Désignation"
                    onChange = { handleChangeInput }
                    value = { currentType.typeName }
                />

                <Select
                    style = {{ width: '100%', marginTop: 20 }}
                    placeholder = "Catégorie"
                    showSearch
                    options = {
                        [{ label: 'Selectionnez la catégorie', value: ''}]
                        .concat( categories.map( category => ({
                            label: category.categoryName,
                            value: category.categoryId
                        })))
                    }
                    onChange = { value => setType({ ...type, categoryId: value }) }
                    value = { currentType.categoryId || '' }
                />

            </Modal>
        </>
    )
}