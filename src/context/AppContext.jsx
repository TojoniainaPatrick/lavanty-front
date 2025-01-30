import { createContext, useState } from "react";
import axios from "../api/axios";

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {

    const [ categories, setCategories ] = useState([])
    const [ currentCategory, setCurrentCategory ] = useState({})
    const getCategories = async _ => {
        await axios('/category/list')
        .then( res => setCategories( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ types, setTypes ] = useState([])
    const [ currentType, setCurrentType ] = useState({})
    const getTypes = async _ => {
        await axios('/type/list')
        .then( res => setTypes( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ products, setProducts ] = useState([])
    const [ currentProduct, setCurrentProduct ] = useState({})
    const getProducts = async _ => {
        await axios('/product/list')
        .then( res => setProducts( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ auctions, setAuctions ] = useState([])
    const [ currentAuction, setCurrentAuction ] = useState({})
    const getAuctions = async _ => {
        await axios('/auction/list')
        .then( res => setAuctions( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ bids, setBids ] = useState([])
    const [ currentBid, setCurrentBid ] = useState({})
    const getBids = async _ => {
        await axios('/auction/list')
        .then( res => setBids( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ users, setUsers ] = useState([])
    const [ currentUser, setCurrentUser ] = useState({})
    const getUsers = async _ => {
        await axios('/user/list')
        .then( res => setUsers( res.data.data ))
        .catch( error => console.log( error ))
    }

    return(
        <AppContext.Provider value = {{

            getCategories,
            categories, setCategories,
            currentCategory, setCurrentCategory,

            getTypes,
            types, setTypes,
            currentType, setCurrentType,

            getProducts,
            products, setProducts,
            currentProduct, setCurrentProduct,

            getAuctions,
            auctions, setAuctions,
            currentAuction, setCurrentAuction,

            getBids,
            bids, setBids,
            currentBid, setCurrentBid,

            getUsers,
            users, setUsers,
            currentUser, setCurrentUser
        }}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContext