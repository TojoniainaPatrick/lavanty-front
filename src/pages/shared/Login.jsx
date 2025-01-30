import { useState } from "react"
import logo from '../../assets/images/white-logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from '../../api/axios'
import PasswordInput from "../../components/input/PasswordInput"
import { FaArrowRightLong } from "react-icons/fa6"
import TextInput from "../../components/input/TextInput"
import { LiaUserEditSolid } from 'react-icons/lia'
import { GrLogin } from "react-icons/gr"



export default function Login(){

    const [ userEmail, setUserEmail ] = useState('')
    const [ userPassword, setUserPassword ] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async () => {
        if ( userEmail.trim() == '') {
            message.warning('Veuillez saisir votre adresse mail!')
        }
        else if ( userPassword.trim() == '') {
            message.warning('Veuillez saisir votre mot de passe!')
        }
        else{
            
            await axios.post('/user/authenticate', { userEmail, userPassword })
            .then( response => {

                let user = response.data.data
                delete user.userPassword
                localStorage.setItem('user', JSON.stringify(user))
                console.log( user )

                if( user?.userRole === 'admin'){
                    const from =  location?.state?.from?.pathname ? location.state.from.pathname : '/admin/dashboard'
                    navigate(from, {replace: true})
                }
                else{
                    const from =  location?.state?.from?.pathname ? location.state.from.pathname : '/'
                    navigate(from, {replace: true})
                }
            })
            .catch( errordata => {
                message.error( errordata?.response?.data?.message )
                console.log(errordata)
            })
        }
    }

    return(
        <>

            <div className="authentication-page">
                <div className="authentication-container">

                    <div className="logo-container">
                        <img src = { logo } alt = 'Aquatic service logo' width = { 150 } />
                    </div>

                    <TextInput
                        value = { userEmail }
                        setValue = { setUserEmail }
                        size = 'large'
                        placeholder = 'Addresse mail'
                        type = 'email'
                    />

                    <PasswordInput
                        password = {userPassword}
                        setPassword = { setUserPassword }
                        placeholder = 'Mot de passe'
                        size = 'large'
                    />

                    <div className="btn-container">
                        <button onClick = { handleSubmit }>
                            <i> <GrLogin /> </i>
                            <span> Se connecter </span> 
                        </button>
                    </div>

                    <div className="link-container">
                        <Link to = "/register">
                            <span> Créer un compte </span>
                            <i> <FaArrowRightLong /> </i>
                        </Link>
                    </div>


                </div>
            </div>
        </>
    )
}