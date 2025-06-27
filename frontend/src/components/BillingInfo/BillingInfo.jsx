import React from 'react'
import './BillingInfo.scss'
import PaymentIcon from '@mui/icons-material/Payment';

const BillingInfo = () => {
    return (
        <div className='billing-info'>
            <p className='profile-info-title1'>Payment Methods</p>
            <p className='profile-info-title2' style={{ marginBottom: '2rem' }}>Manage your saved payment methods</p>

            <div className='payment-option'>
                <div className='payment-card'>
                    <div className='payment-card-icon'>
                        <PaymentIcon />
                    </div>
                    <div className='payment-details'>
                        <p className='payment-card-no'>•••• •••• •••• 4242</p>
                        <p className='payment-card-expiry'>Expires 12/25</p>
                    </div>
                </div>
                <div className='payment-card-edit-option'>
                    <button className='payment-card-edit'>Edit</button>
                </div>
            </div>
            <button className='add-payment-card'>Add new Payment Method</button>

            <p className='profile-info-title1' style={{ marginTop: '2rem' }}>Billing Address</p>
            <p className='profile-info-title2' style={{ marginBottom: '2rem' }}>Address used for billing purposes</p>

            <div className='payment-addresses'>
                <div className='payment-address-info'>
                    <p className='payment-owner'>Mohan Pyare</p>
                    <p className='payment-address'>123 Main Street</p>
                    <p className='payment-address'>New York, NY 10001</p>
                    <p className='payment-address'>United States</p>
                    <p className='payment-phone'><span>Phone No.:- </span>+91 123456789</p>
                    <button className='payment-card-edit'>Edit</button>
                </div>

                <div className='payment-address-info'>
                    <p className='payment-owner'>Mohan Pyare</p>
                    <p className='payment-address'>123 Main Street</p>
                    <p className='payment-address'>New York, NY 10001</p>
                    <p className='payment-address'>United States</p>
                    <p className='payment-phone'><span>Phone No.:- </span>+91 123456789</p>
                    <button className='payment-card-edit'>Edit</button>
                </div>
            </div>


            <button className='add-payment-card'>Add new Address</button>
        </div>
    )
}

export default BillingInfo
