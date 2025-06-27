import React from 'react'
import './Preference.scss'
import Toggle from '../Toggle/Toggle'

const Preference = () => {

    return (
        <div className='preference-section'>
            <p className='profile-info-title1'>Notification Preferences</p>
            <p className='profile-info-title2' style={{marginBottom: '2rem'}}>Choose how you want to receive updates and notifications</p> 

            <div className='preference-notify'>
                <div className='preference-option'>
                    <p className='preference-heading'>Email Notifications</p>
                    <p className='preference-description'>Receive notifications via email</p>
                </div>
                <div>
                    <Toggle toggled={false}/>
                </div>
            </div>

             <div className='preference-notify'>
                <div className='preference-option'>
                    <p className='preference-heading'>SMS Notifications</p>
                    <p className='preference-description'>Receive notifications via text message</p>
                </div>
                <div>
                    <Toggle toggled={true}/>
                </div>
            </div>

             <div className='preference-notify'>
                <div className='preference-option'>
                    <p className='preference-heading'>Marketing Emails</p>
                    <p className='preference-description'>Receive promotional offers and updates</p>
                </div>
                <div>
                    <Toggle toggled={true}/>
                </div>
            </div>

             <div className='preference-notify'>
                <div className='preference-option'>
                    <p className='preference-heading'>Order Updates</p>
                    <p className='preference-description'>Get notified about order status changes</p>
                </div>
                <div>
                    <Toggle toggled={false}/>
                </div>
            </div>
        </div>
    )
}

export default Preference
