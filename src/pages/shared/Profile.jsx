import AppPageTitle from "../../components/AppPageTitle"
import { FaRegUserCircle, FaRegImage, FaRegSave } from "react-icons/fa"
import { MdOutlineSaveAs } from "react-icons/md";
import defaultUserImage from '../../assets/images/defaultUserImage.png'
import React, { useRef, useState } from 'react';
import {
  Button,
  Image,
  Checkbox,
  Form,
  Input,
  Select,
} from 'antd';
import PasswordInput from "../../components/input/PasswordInput";
import Swal from "sweetalert2";
import axios from '../../api/axios'

export default function Profile() {

    const [ user, setUser ] = useState( JSON.parse( localStorage.getItem( 'user' )))
    const isUserBuyer = user?.userRole?.toString().toLowerCase() == 'acheteur'

    const [ formEnabled, setFormEnabled ] = useState( true );
    const [ editablePassword, setEditablePassword ] = useState( false );

    const [ userPassword, setUserPassword ] = useState("")
    const [ userNewPassword, setUserNewPassword ] = useState("")
    const [ confirmUserNewPassword, setConfirmUserNewPassword ] = useState("")

    
    const [ file, setFile ] = useState( null )
    const imageInputRef = useRef()

    const editProfile = async () => {
        if( !user.userName ){
            Swal.fire({
                icon: "warning",
                title: "Modification du profil",
                text: "Merci de bien vouloir saisir votre nom!",
            });
        }
        else if( !user.userEmail ){
            Swal.fire({
                icon: "warning",
                title: "Modification du profil",
                text: "Merci de bien vouloir saisir votre adresse e-mail!",
            });
        }
        else if( isUserBuyer && !user.userAddress ){
            Swal.fire({
                icon: "warning",
                title: "Modification du profil",
                text: "Merci de bien vouloir saisir l'adresse de votre domicile!",
            });
        }
        else if( isUserBuyer && !user.userPhoneNumber ){
            Swal.fire({
                icon: "warning",
                title: "Modification du profil",
                text: "Merci de bien vouloir saisir lw numéro de votre téléphone!",
            });
        }
        else{
            await axios.put(`/user/update/${ user.userId }`, user )
            .then( _ => {
                setFormEnabled( false )
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
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

    const editPassword = async () => {
        if( !userPassword ){
            Swal.fire({
                icon: "warning",
                title: "Chagement du mot de passe",
                text: "Merci de bien vouloir saisir votre mot de passe actuel!",
            });
        }
        else if( !userNewPassword ){
            Swal.fire({
                icon: "warning",
                title: "Chagement du mot de passe",
                text: "Merci de bien vouloir saisir votre nouveau mot de passe!",
            });
        }
        else if( !confirmUserNewPassword ){
            Swal.fire({
                icon: "warning",
                title: "Chagement du mot de passe",
                text: "Merci de bien vouloir confirmer votre nouveau mot de passe!",
            });
        }
        else if( userNewPassword != confirmUserNewPassword ){
            Swal.fire({
                icon: "warning",
                title: "Chagement du mot de passe",
                text: "La confirmation du mot de passe ne correspond pas!",
            });
        }
        else{
            await axios.put(`/user/change-password/`, {
                userEmail: user?.userEmail,
                userPassword,
                userNewPassword
            })
            .then( _ => {
                setEditablePassword( false )
                setUserPassword("")
                setUserNewPassword("")
                setConfirmUserNewPassword("")
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 1500
                });
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
        
    const changeProfileImage = async event => {
        try {
    
            const image = event.target.files?.[0];
            if( !image ) return;
    
            setFile( image )
    
        } catch (error) {
            console.log( error )
        }
    }


    const saveProfilePicture = async () => {
        
        const formData = new FormData();
        formData.append('file', file );

        await axios.put(
            `/user/update-image/${ user?.userId }`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' }}
        )
        .then( response => {

            let tempUser = response.data.data
            delete tempUser.userPassword

            localStorage.setItem('user', JSON.stringify( tempUser ))
            setUser( tempUser )

            setFile( null )
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Opération effectuée avec succès!",
                showConfirmButton: false,
                timer: 1500
            });
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

    return(
        <div className="profile-page main-page">

            <AppPageTitle icon = { <FaRegUserCircle /> } title = "Profil" />

            <div className="profile-page-content">

                <div className="profile-picture-section">
                    
                    <input
                        onChange = { changeProfileImage }
                        style={{ display: 'none'}}
                        type="file"
                        className="custom-image-input"
                        ref = { imageInputRef }
                    />

                    <Image
                        src = { file ? URL.createObjectURL( file ) : user?.userPictureURl ? user?.userPictureURl : defaultUserImage }
                        alt = "User profile picture"
                        width = { 150 }
                    />

                    <Button block className = "profile-picture-button" onClick = { () => imageInputRef.current.click()}>
                        <i> <FaRegImage size = { 18 }/> </i>
                        <span> Modifer </span>
                    </Button>

                    {
                        file &&
                        <Button block className = "profile-picture-save-button" onClick = { saveProfilePicture }>
                            <i> <FaRegSave size = { 18 }/> </i>
                            <span> Enregistrer </span>
                        </Button>
                    }

                </div>

                <div className="profile-info-section">

                    <div className="checkbox-container">
                        <Checkbox
                            checked = { formEnabled }
                            onChange = {( e ) => setFormEnabled (e.target.checked )}
                            style = {{
                                marginBlock: 20,
                                background: 'var(--dark-yellow)',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: 5
                            }}
                        >
                            Modifier mon profil
                        </Checkbox>

                        <Checkbox
                            checked = { editablePassword }
                            onChange = {( e ) => setEditablePassword (e.target.checked )}
                            style = {{
                                marginBlock: 20,
                                background: 'var(--dark-yellow)',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: 5
                            }}
                        >
                            Modifier mon mot de passe
                        </Checkbox>

                    </div>

                    {
                        formEnabled &&
                        <div className="edit-info">
                            <Form
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                disabled = { !formEnabled }
                                style={{ maxWidth: 400, margin: 'auto' }}
                            >

                                <Form.Item label="Nom d'utilisateur">
                                    <Input
                                        value = { user?.userName || '' }
                                        onChange = { event => setUser({ ...user, userName: event.target.value })}
                                    />
                                </Form.Item>

                                <Form.Item label="Adresse e-maile">
                                    <Input
                                        value = { user?.userEmail || '' }
                                        onChange = { event => setUser({ ...user, userEmail: event.target.value })}
                                    />
                                </Form.Item>

                                {
                                    isUserBuyer &&
                                    <>
                                        <Form.Item label="Adresse du domicile">
                                            <Input
                                                value = { user?.userAddress || '' }
                                                onChange = { event => setUser({ ...user, userAddress: event.target.value })}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Numéro de téléphone">
                                            <Input
                                                value = { user?.userPhoneNumber || '' }
                                                onChange = { event => {
                                                    if( /^\d{0,12}$/.test( event.target.value )) setUser({ ...user, userPhoneNumber: event.target.value })
                                                }}
                                            />
                                        </Form.Item>
                                    </>
                                }


                                <Button block onClick = { editProfile }>
                                    <i> <MdOutlineSaveAs /> </i>
                                    <span> Enregistrer </span>
                                </Button>

                            </Form>
                        </div>
                    }

                    {
                        editablePassword &&
                        <div className="edit-password">
                            <Form
                                labelCol={{ span: 20 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                disabled = { !editablePassword }
                                style={{ maxWidth: 400, margin: 'auto', gap: 10 }}
                            >

                                <Form.Item style={{ marginBottom: 15 }}  label="Mot de passe actuel">
                                    <PasswordInput
                                        placeholder='Mot de passe actuel'
                                        password={userPassword}
                                        setPassword={setUserPassword}
                                        size='large'
                                        disabled = { !editablePassword }
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 15 }} label="Nouveau mot de passe">
                                    <PasswordInput
                                        placeholder='Nouveau mot de passe'
                                        password={userNewPassword}
                                        setPassword={setUserNewPassword}
                                        size='large'
                                        disabled = { !editablePassword }
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 15 }}  label="Confirmation de nouveau mot de passe">
                                    <PasswordInput
                                        placeholder='Confirmation de nouveau mot de passe'
                                        password={confirmUserNewPassword}
                                        setPassword={setConfirmUserNewPassword}
                                        size='large'
                                        disabled = { !editablePassword }
                                    />
                                </Form.Item>

                                <Button block onClick = { editPassword }>
                                    <i> <MdOutlineSaveAs /> </i>
                                    <span> Enregistrer </span>
                                </Button>

                            </Form>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}