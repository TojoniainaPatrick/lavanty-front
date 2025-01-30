import AppPageTitle from "../../components/AppPageTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit, MdOutlineCategory } from "react-icons/md";
import { Button, Input, Space, Table } from 'antd'
import { typesTableColumns } from "../../constant/tableColumns";
const { Search } = Input
import Swal from 'sweetalert2'
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../../api/axios";
import UpdateType from "../../components/type/UpdateType";
import NewType from "../../components/type/NewType";

export default function Types() {

    const {
        types,
        getTypes,
        setCurrentType
    } = useAppContext()

    useEffect(() => {
        getTypes()
    }, [])

    const [ searchText, setSearchText ] = useState("")
    const [ openUpdate, setOpenUpdate ] = useState( false )

    const searchedData = types.filter( type =>
        type.typeName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
        type.category?.categoryName?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
    )
    
    const handleOpenUpdate = ( type ) => {
        setCurrentType( type )
        setOpenUpdate( true )
    }

    const deleteType = async typeId => {
       
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
                await axios.delete(`/type/delete/${typeId}`)
                .then( _ => {
                    getTypes()
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
            <UpdateType open = { openUpdate } setOpen = { setOpenUpdate } />

            <div className="types-page main-page">

                <AppPageTitle icon = { <MdOutlineCategory /> } title = "Types" />

                <div className="app-page-header">
                    <Search
                        style = {{ width: 250 }}
                        onChange = { e => setSearchText( e.target.value )}
                    />
                    <NewType />
                </div>

                <div className="app-page-body">
                    <Table
                        columns = { typesTableColumns }
                        bordered
                        dataSource = {
                            searchedData.map((type, key) =>({
                                ...type,
                                key,
                                categoryName: type.category?.categoryName,
                                createdAt: dayjs( type.createdAt ).format('DD/MM/YYYY'),
                                updatedAt: dayjs( type.updatedAt ).format('DD/MM/YYYY'),
                                action:
                                <Space>

                                    <Button
                                        type="primary"
                                        color="var( --blue ) "
                                        icon = { <MdEdit /> }
                                        onClick = { () => handleOpenUpdate( type )}
                                        style = {{
                                            background: 'var( --blue-light-active )'
                                        }}
                                    >
                                        Modifier
                                    </Button>

                                    <Button
                                        type="primary"
                                        icon = { <RiDeleteBin6Line /> }
                                        onClick = { () => deleteType( type.typeId ) }
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