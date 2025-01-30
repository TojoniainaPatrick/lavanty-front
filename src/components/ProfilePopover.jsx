import { Avatar, Popover } from 'antd';
import React, { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6"
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import userDefaultImage from '../assets/images/defaultUserImage.png'

const PopoverContent = ({ profileLink }) => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    const goToProfile = () => {
        navigate( profileLink )
    }

    return (
        <div className='profile-popover'>
            <button onClick = { goToProfile }>
                <i> <FaRegCircleUser /> </i>
                <span> Profil </span>
            </button>
            <button onClick = { handleLogOut }>
                <i> <RiLogoutBoxRLine /> </i>
                <span> Se déconnecter </span>
            </button>
        </div>
    )
}

function ProfilePopover({ profileLink }) {

    const [open, setOpen] = useState(false);

    
    const user = JSON.parse(localStorage.getItem('user')) || {}

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            content={ < PopoverContent profileLink={profileLink} />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Avatar
                src = { userDefaultImage }
                size = "large"
                style={{
                    border: '2px solid var(--blue-light-active)',
                    padding: 3
                }}
            />
        </Popover>
    
  )
}

export default ProfilePopover