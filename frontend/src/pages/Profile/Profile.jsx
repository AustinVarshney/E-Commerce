import React from 'react'
import "./Profile.scss"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ProfileSections from '../../components/ProfileSections/ProfileSections';

const Profile = () => {
    return (
        <div className='profile'>
            <div className='profile-titles'>
                <p className='profile-heading'><AccountBoxIcon /> My Profile</p>
                <p className='profile-description'>Manage your account settings and preferences</p>
            </div>

            <ProfileSections/>
        </div>
    )
}

export default Profile
