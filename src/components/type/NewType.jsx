import { Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";

export default function NewType(){

    const {
        getCategories,
        categories,
        getTypes
    } = useAppContext()

    useEffect(() => {
        getCategories()
    }, [])

    const [ open, setOpen ] = useState( false )

    const [ type, setType ] = useState({
        typeName: "",
        categoryId: ""
    })

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setType({
            typeName: "",
            categoryId: ""
        })
    }

    const confirm = async _ => {
        if( !type.typeName ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau type de produit",
                text: "Merci de bien vouloir indiquer la désignation!",
            });
        }
        else if( !type.categoryId ){
            Swal.fire({
                icon: "warning",
                title: "Nouveau type de produit",
                text: "Merci de bien vouloir choisir une catégorie!",
            });
        }
        else{
            await axios.post('/type/insert', type )
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
            <button className="blue-button" onClick = { openModal }>
                <i> <CiSquarePlus /> </i> Ajouter un type
            </button>

            <Modal
                open = { open }
                title = 'Nouveau type de produit'
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

                <Input
                    type="text"
                    id="typeName"
                    placeholder="Désignation"
                    onChange = { handleChangeInput }
                    value = { type.typeName }
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
                    value = { type.categoryId || '' }
                />

            </Modal>
        </>
    )
}