import AppPageTitle from "../../components/AppPageTitle";
import { BiCategory } from 'react-icons/bi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Avatar, Button, Input, Space, Table } from 'antd'
const { Search } = Input
import Swal from 'sweetalert2'
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import NewProduct from "../../components/product/NewProduct";
import { productsTableColumns } from "../../constant/tableColumns";
import UpdateProduct from "../../components/product/UpdateProduct";
import { IoMdCart } from "react-icons/io";

export default function Products() {

    const {
        products,
        getProducts,
        setCurrentProduct
    } = useAppContext()

    useEffect(() => {
        getProducts()
    }, [])

    const [ searchText, setSearchText ] = useState("")
    const [ openUpdate, setOpenUpdate ] = useState( false )

    const searchedData = products.filter( product =>
        product.productName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        product.type?.typeName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        product.type?.category?.categoryName?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
    )
    
    const handleOpenUpdate = ( product ) => {
        setCurrentProduct( product )
        setOpenUpdate( true )
    }
    const deleteProduct = async productId => {
       
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
                await axios.delete(`/product/delete/${productId}`)
                .then( _ => {
                    getProducts()
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
            <UpdateProduct open = { openUpdate } setOpen = { setOpenUpdate } />

            <div className="products-page main-page">

                <AppPageTitle icon = { <IoMdCart /> } title = "Produits" />

                <div className="app-page-header">
                    <Search
                        style = {{ width: 250 }}
                        onChange = { e => setSearchText( e.target.value )}
                    />
                    <NewProduct />
                </div>

                <div className="app-page-body">
                    <Table
                        columns = { productsTableColumns }
                        bordered
                        dataSource = {
                            searchedData.map((product, key) =>({
                                ...product,
                                key,
                                productImage: <Avatar alt = "Photo du produit" src = { product.productImageURl } />,
                                typeName: product.type?.typeName,
                                categoryName: product.type?.category?.categoryName,
                                action:
                                <Space>

                                    <Button
                                        type="primary"
                                        icon = { <MdEdit /> }
                                        onClick = { () => handleOpenUpdate( product )}
                                        style = {{
                                            background: 'var( --blue-light-active )'
                                        }}
                                    />

                                    <Button
                                        type="primary"
                                        icon = { <RiDeleteBin6Line /> }
                                        onClick = { () => deleteProduct( product.productId )}
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