import React from 'react'
import "./MyOrders.scss"
import MyOrdersPic from "../../assets/MyOrder.png"
import SingleOrder from '../../components/SingleOrder/SingleOrder'

const MyOrders = () => {
    return (
        <div className='orders-page-container'>
            <p className='myorder-title'><img src={MyOrdersPic} alt="" />My Orders</p>
            <p className='myorder-track-title'>Track and manage your orders</p>

            <SingleOrder status='delivery'/>
            <SingleOrder status='shipped'/>
            <SingleOrder status='processing'/>
        </div>
    )
}

export default MyOrders
