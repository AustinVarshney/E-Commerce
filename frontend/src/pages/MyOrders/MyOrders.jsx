import React from 'react'
import "./MyOrders.scss"
import MyOrdersPic from "../../assets/MyOrder.png"
import SingleOrder from '../../components/SingleOrder/SingleOrder'

const MyOrders = ({ isMyOrder = true }) => {
    return (
        <div className='orders-page-container'>
            <p className='myorder-title'><img src={MyOrdersPic} alt="" />My Orders</p>
            <p className='myorder-track-title'>Track and manage your orders</p>

            {isMyOrder ? 
                <div>
                    <SingleOrder status='delivery' />
                    <SingleOrder status='shipped' />
                    <SingleOrder status='processing' />
                </div>
            :
                <div className='no-wishlist-item'>
                    No Orders yet
                </div>
        }



        </div>
    )
}

export default MyOrders
