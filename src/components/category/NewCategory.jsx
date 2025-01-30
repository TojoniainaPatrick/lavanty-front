import { Input, Modal } from "antd";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import useAppContext from "../../hooks/useAppContext";
import axios from "../../api/axios";

export default function NewCategory(){

    const {
        getCategories
    } = useAppContext()

    const [ open, setOpen ] = useState( false )

    const [ category, setCategory ] = useState({ categoryName: "" })

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setCategory({ categoryName: "" })
    }

    const confirm = async _ => {
        if( !category.categoryName ){
            Swal.fire({
                icon: "warning",
                title: "Nouvelle catégorie",
                text: "Merci de bien vouloir indiquer la désignation!",
            });
        }
        else{
            await axios.post('/category/insert', category )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getCategories()
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
        setCategory({ ...category, [ id ]: value })
    }

    return(
        <>
            <button className="blue-button" onClick = { openModal }>
                <i> <CiSquarePlus /> </i> Ajouter une catégorie
            </button>

            <Modal
                open = { open }
                title = 'Nouvelle catégorie'
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
                    id="categoryName"
                    placeholder="Désignation"
                    onChange = { handleChangeInput }
                    value = { category.categoryName }
                />

            </Modal>
        </>
    )
}