import AppPageTitle from "../../components/AppPageTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, Button, Input, Space, Table } from 'antd'
const { Search } = Input
import Swal from 'sweetalert2'
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { usersTableColumns } from "../../constant/tableColumns";
import { IoMdCart } from "react-icons/io";

export default function Users() {

    const {
        users,
        getUsers,
        setCurrentUser
    } = useAppContext()

    useEffect(() => {
        getUsers()
    }, [])

    const [ searchText, setSearchText ] = useState("")

    const searchedData = users.filter( user =>
        user.userName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        user.userEmail?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        user.userAddress?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        user.userPhoneNumber?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
    )
    
    const deleteProduct = async userId => {
       
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
                await axios.delete(`/user/delete/${ userId }`)
                .then( _ => {
                    getUsers()
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
        <div className="users-page main-page">

            <AppPageTitle icon = { <IoMdCart /> } title = "Produits" />

            <div className="app-page-header">
                <Search
                    style = {{ width: 250 }}
                    onChange = { e => setSearchText( e.target.value )}
                />
            </div>

            <div className="app-page-body">
                <Table
                    columns = { usersTableColumns }
                    bordered
                    dataSource = {
                        searchedData
                        .filter( user => user.userRole?.toString().toLowerCase() !== 'admin')
                        .map((user, key) =>({
                            ...user,
                            key,
                            userName:
                            <Space>
                                <Avatar alt = "Photo du produit" src = { user.userPictureURl } />
                                <span> { user.userName } </span>
                            </Space>,
                            action:
                            <Space>

                                <Button
                                    type="primary"
                                    icon = { <RiDeleteBin6Line /> }
                                    onClick = { () => deleteProduct( user.userId )}
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
    )
}