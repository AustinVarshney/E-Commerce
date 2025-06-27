import React from 'react'
import './PersonalInfo.scss'

const PersonalInfo = () => {
    return (
        <div className='profile-section-1'>
            <p className='profile-info-title1'>Personal Information</p>
            <p className='profile-info-title2'>Manage your account settings and preferences</p>

            <form action="#">
                <div className='profile-username'>
                    <div className='profile-first-name'>
                        <label htmlFor='user-first-name' className='username-text'>First Name</label>
                        <input type="text" id='user-first-name' placeholder='Mohan' className='username-input' />
                    </div>
                    <div className='profile-last-name'>
                        <label htmlFor='user-last-name' className='username-text'>Last Name</label>
                        <input type="text" id='user-last-name' placeholder='Pyare' className='username-input' />
                    </div>
                </div>

                <div className='profile-contact'>
                    <div className='profile-first-name'>
                        <label htmlFor='user-email' className='username-text'>Email</label>
                        <input type="email" id='user-email' placeholder='mohanpyare@gmail.com' className='username-input' />
                    </div>
                    <div className='profile-last-name'>
                        <label htmlFor='user-phone' className='username-text'>Phone No.</label>
                        <input type="text" id='user-phone' placeholder='(+91)1234567890' className='username-input' />
                    </div>
                </div>

                <hr className='profile-hr-line' />

                <p className='profile-additional-title'>Additional Information</p>

                <div className='profile-address'>
                    <label htmlFor='user-address' className='username-text'>Address</label>
                    <input type="text" id='user-address' placeholder='Brij Vihar Colony @Vrindavan Road, Mathura' className='address-input' />
                </div>

                <div className='profile-location'>
                    <div className='profile-city'>
                        <label htmlFor='user-city' className='username-text'>City</label>
                        <input type="text" id='user-city' placeholder='Vrindavan' className='username-input' />
                    </div>
                    <div className='profile-state'>
                        <label htmlFor='user-state' className='username-text'>State</label>
                        <input type="text" id='user-state' placeholder='Uttar Pradesh' className='username-input' />
                    </div>
                    <div className='profile-pincode'>
                        <label htmlFor='user-pincode' className='username-text'>Pin Code</label>
                        <input type="text" id='user-pincode' placeholder='202001' className='username-input' />
                    </div>
                </div>
            </form>

            <div className='personal-Info-Edit'>
                <button className='payment-card-edit personal-info-edit-btn'>Edit</button>
            </div>
        </div>
    )
}

export default PersonalInfo
