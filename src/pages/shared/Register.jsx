import { useState } from "react"
import logo from '../../assets/images/white-logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input, message } from 'antd'
import axios from '../../api/axios'
import { FaArrowRightLong } from "react-icons/fa6"
import { LiaUserEditSolid } from "react-icons/lia"
import useAppContext from "../../hooks/useAppContext"


export default function Register(){

    const [ newUser, setNewUser ] = useState({
        userName: "",
        userEmail: "",
        userAddress: "",
        userPhoneNumber: "",
        userPassword: ""
    })

    const {
        setUser
    } = useAppContext()

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async () => {
        if ( !newUser.userEmail ) {
            message.warning('Veuillez saisir votre adresse mail!')
        }
        else if ( !newUser.userName ) {
            message.warning('Veuillez saisir votre nom d\'utilisateur!')
        }
        else if ( !newUser.userAddress ) {
            message.warning('Veuillez saisir l\'adresse de votre domicile!')
        }
        else if ( !newUser.userPhoneNumber ) {
            message.warning('Veuillez saisir le numéro de votre téléphone!')
        }
        else if ( !newUser.userPassword ) {
            message.warning('Veuillez saisir votre mot de passe!')
        }
        else{
            
            await axios.post('/newUser/insert',  newUser )
            .then( response => {
                
                message.success('Inscription réussie!')
                let newUser = response.data.data
                delete newUser.userPassword
                localStorage.setItem('user', JSON.stringify(newUser))
                setUser( newUser )

                const from =  location?.state?.from?.pathname ? location.state.from.pathname : '/'
                navigate(from, {replace: true})

            })
            .catch( errordata => {
                message.error( errordata?.response?.data?.message )
                console.log(errordata)
            })
        }
    }

    const handleChangeInput = e => {
        const { id, value } = e.target
        setNewUser({ ...newUser, [ id ]: value })
    }

    return(
        <>

            <div className="authentication-page">
                <div className="authentication-container" style={{ gap: 15 }}>

                    <div className="logo-container">
                        <img src = { logo } alt = 'Aquatic service logo' width = { 150 } />
                    </div>

                    <Input
                        value = { newUser.userEmail }
                        onChange = { handleChangeInput }
                        id = "userEmail"
                        size = 'large'
                        placeholder = 'Addresse e-mail'
                        type = 'email'
                    />

                    <Input
                        value = { newUser.userName }
                        onChange = { handleChangeInput }
                        id = "userName"
                        size = 'large'
                        placeholder = "Nom d'utilisateur"
                        type = 'text'
                    />

                    <Input
                        value = { newUser.userAddress }
                        onChange = { handleChangeInput }
                        id = "userAddress"
                        size = 'large'
                        placeholder = "Adresse du domicile"
                        type = 'text'
                    />

                    <Input
                        value = { newUser.userPhoneNumber }
                        onChange = { event => {
                            if(/^\d{0,12}$/.test( event.target.value )) handleChangeInput( event )
                        }}
                        id = "userPhoneNumber"
                        size = 'large'
                        placeholder = "Numéro de téléphone"
                        type = 'text'
                    />

                    <Input.Password
                        value = { newUser.userPassword }
                        onChange = { handleChangeInput }
                        id = "userPassword"
                        size = 'large'
                        placeholder = "Mot de passe"
                        type = 'password'
                    />

                    <div className="btn-container">
                        <button onClick = { handleSubmit }>
                            <i> <LiaUserEditSolid /> </i>
                            <span> S'inscrire </span> 
                        </button>
                    </div>

                    <div className="link-container">
                        <Link to = "/login">
                            <span> Se connecter </span>
                            <i> <FaArrowRightLong /> </i>
                        </Link>
                    </div>


                </div>
            </div>
        </>
    )
}