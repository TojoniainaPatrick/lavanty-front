import { useState } from "react"
import logo from '../../assets/images/white-logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input, message } from 'antd'
import axios from '../../api/axios'
import { FaArrowRightLong } from "react-icons/fa6"
import { LiaUserEditSolid } from "react-icons/lia"


export default function Register(){

    const [ user, setUser ] = useState({
        userName: "",
        userEmail: "",
        userAddress: "",
        userPhoneNumber: "",
        userPassword: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async () => {
        if ( !user.userEmail ) {
            message.warning('Veuillez saisir votre adresse mail!')
        }
        else if ( !user.userName ) {
            message.warning('Veuillez saisir votre nom d\'utilisateur!')
        }
        else if ( !user.userAddress ) {
            message.warning('Veuillez saisir l\'adresse de votre domicile!')
        }
        else if ( !user.userPhoneNumber ) {
            message.warning('Veuillez saisir le numéro de votre téléphone!')
        }
        else if ( !user.userPassword ) {
            message.warning('Veuillez saisir votre mot de passe!')
        }
        else{
            
            await axios.post('/user/insert',  user )
            .then( response => {
                
                message.success('Inscription réussie!')
                let user = response.data.data
                delete user.userPassword
                localStorage.setItem('user', JSON.stringify(user))
                console.log( user )

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
        setUser({ ...user, [ id ]: value })
    }

    return(
        <>

            <div className="authentication-page">
                <div className="authentication-container" style={{ gap: 15 }}>

                    <div className="logo-container">
                        <img src = { logo } alt = 'Aquatic service logo' width = { 150 } />
                    </div>

                    <Input
                        value = { user.userEmail }
                        onChange = { handleChangeInput }
                        id = "userEmail"
                        size = 'large'
                        placeholder = 'Addresse e-mail'
                        type = 'email'
                    />

                    <Input
                        value = { user.userName }
                        onChange = { handleChangeInput }
                        id = "userName"
                        size = 'large'
                        placeholder = "Nom d'utilisateur"
                        type = 'text'
                    />

                    <Input
                        value = { user.userAddress }
                        onChange = { handleChangeInput }
                        id = "userAddress"
                        size = 'large'
                        placeholder = "Adresse du domicile"
                        type = 'text'
                    />

                    <Input
                        value = { user.userPhoneNumber }
                        onChange = { event => {
                            if(/^\d{0,12}$/.test( event.target.value )) handleChangeInput( event )
                        }}
                        id = "userPhoneNumber"
                        size = 'large'
                        placeholder = "Numéro de téléphone"
                        type = 'text'
                    />

                    <Input.Password
                        value = { user.userPassword }
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