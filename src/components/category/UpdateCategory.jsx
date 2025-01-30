import React, { useState } from 'react';
import { Input, message, Modal } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import useAppContext from '../../hooks/useAppContext';
import axios from '../../api/axios';

export default function UpdateCategory({ open, setOpen }){

    const {
        getCategories,
        currentCategory,
        setCurrentCategory
    } = useAppContext()

    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleSubmit = async _ => {

        if( !currentCategory.categoryName ) message.warning('Merci de bien vouloir indiquer la désignation!')
        else{
            setConfirmLoading(true);
        
            await axios.put(`/category/update/${ currentCategory?.categoryId }`,  currentCategory )
            .then( response => {
                message.success( response.data.message)
                getCategories()
                setOpen(false);
                setConfirmLoading(false);
                setCurrentCategory({})
            })
            .catch( error => {
                if( error?.response?.data?.message ) message.error( error?.response?.data?.message )
                else message.error( error.message )
                setConfirmLoading(false);
            })
        }

    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleChangeInput = e => {
        const{ id, value } = e.target
        setCurrentCategory({ ...currentCategory, [ id ]: value })
    }


    return (
        <>
        
        <Modal
            title = "Modification de catégorie"
            open = { open }
            onOk = { handleSubmit }
            confirmLoading = { confirmLoading }
            onCancel = { handleCancel }
            okText = 'Modifier'
            okButtonProps={{
                style: {
                    color: "white",
                    background: 'var( --blue )'
                },
                // icon:  <FaRegEdit />
            }}
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
                value = { currentCategory.categoryName }
            />

        </Modal>
        </>
    );
};