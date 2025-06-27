import React from 'react'
import './SecutiryInfo.scss'

const SecutiryInfo = () => {
    return (
        <div className='security-info'>
            <p className='profile-info-title1'>Change Password</p>
            <p className='profile-info-title2' style={{ marginBottom: '2rem' }}>Update your password to keep your account secure</p>

            <form action="#">
                <div className='current-password'>
                    <label htmlFor='current-password' className='current-pass-title'>Current Password</label>
                    <input type="text" to='current-password' className='current-pass-input' />
                </div>

                <div className='new-confirm-password'>
                    <div className='new-password'>
                        <label htmlFor='new-password' className='current-pass-title'>New Password</label>
                        <input type="text" to='new-password' className='new-pass-input' />
                    </div>
                    <div className='new-password'>
                        <label htmlFor='new-password' className='current-pass-title'>Confirm Password</label>
                        <input type="text" to='new-password' className='new-pass-input' />
                    </div>
                </div>

                <button className='password-update-btn'>Update Password</button>
            </form>

        </div>
    )
}

export default SecutiryInfo
