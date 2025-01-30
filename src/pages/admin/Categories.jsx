import AppPageTitle from "../../components/AppPageTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit, MdOutlineSell } from "react-icons/md";
import { Button, Input, Space, Table } from 'antd'
import { categoriesTableColumns } from "../../constant/tableColumns";
const { Search } = Input
import Swal from 'sweetalert2'
import useAppContext from "../../hooks/useAppContext";
import NewCategory from "../../components/category/NewCategory";
import { useEffect, useState } from "react";
import UpdateCategory from "../../components/category/UpdateCategory";
import dayjs from "dayjs";
import axios from "../../api/axios";

export default function Categories() {

    const {
        categories,
        getCategories,
        setCurrentCategory
    } = useAppContext()

    useEffect(() => {
        getCategories()
    }, [])

    const [ searchText, setSearchText ] = useState("")
    const [ openUpdate, setOpenUpdate ] = useState( false )

    const searchedData = categories.filter( category =>
        category.categoryName?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
    )
    
    const handleOpenUpdate = ( category ) => {
        setCurrentCategory( category )
        setOpenUpdate( true )
    }
    const deleteCategory = async categoryId => {
       
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
                await axios.delete(`/category/delete/${categoryId}`)
                .then( _ => {
                    getCategories()
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
            <UpdateCategory open = { openUpdate } setOpen = { setOpenUpdate } />

            <div className="categories-page main-page">

                <AppPageTitle icon = { <MdOutlineSell /> } title = "Catégories" />

                <div className="app-page-header">
                    <Search
                        style = {{ width: 250 }}
                        onChange = { e => setSearchText( e.target.value )}
                    />
                    <NewCategory />
                </div>

                <div className="app-page-body">
                    <Table
                        columns = { categoriesTableColumns }
                        bordered
                        dataSource = {
                            searchedData.map((category, key) =>({
                                ...category,
                                key,
                                createdAt: dayjs( category.createdAt ).format('DD/MM/YYYY'),
                                updatedAt: dayjs( category.updatedAt ).format('DD/MM/YYYY'),
                                action:
                                <Space>

                                    <Button
                                        type="primary"
                                        icon = { <MdEdit /> }
                                        onClick = { () => handleOpenUpdate( category ) }
                                        style = {{
                                            background: 'var( --blue-light-active )'
                                        }}
                                    >
                                        Modifier
                                    </Button>

                                    <Button
                                        type="primary"
                                        icon = { <RiDeleteBin6Line /> }
                                        onClick = { () => deleteCategory( category.categoryId ) }
                                        style = {{
                                            background: 'var( --yellow )',
                                            color: 'var( --blue-light-hover)',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Supprimer
                                    </Button>
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