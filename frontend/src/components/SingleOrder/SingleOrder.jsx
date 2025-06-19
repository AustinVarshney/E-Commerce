import React from 'react'
import './SingleOrder.scss'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestoreIcon from '@mui/icons-material/Restore';
import Pic1 from "../../assets/Pic1.jpg"
import Pic2 from "../../assets/Pic8.jpg"
import Pic3 from "../../assets/Pic2.jpg"
import ShareIcon from '@mui/icons-material/Share';

const SingleOrder = ({status}) => {
    return (
        <div className='singleorder-container'>
            <div className='singleorder-info'>
                <div className='singleorder-id-date'>
                    <p className='singleorder-id'>Order ORD-2024-001</p>
                    <p className='singleorder-date'>Placed on 1/15/2024</p>
                </div>
                <div className='singleorder-status-price'>
                    {status === 'delivery' && (
                        <p className='singleorder-status status-delivery'><TaskAltIcon/> Delivered</p>
                    )}
                    {status === 'shipped' && (
                        <p className='singleorder-status status-shipped'><LocalShippingIcon/> Shipped</p>
                    )}
                    {status === 'processing' && (
                        <p className='singleorder-status status-processing'><RestoreIcon/> Procesing</p>
                    )}

                    <p className='singleorder-price'>$299.99</p>
                </div>
            </div>

            <hr className='myorder-hr-line'/>

            <div className='singleorder-product-detail'>
                <div className='singleorder-detail'>
                    <img src={Pic2} alt="" />
                    <div className='singleorder-title-quantity'>
                        <p className='singleorder-title'>Wireless Mouse</p>
                        <p className='singleorder-quantity'>Qty: 1</p>
                        <p className='singleorder-quantity-price singleorder-quantity'>Price: $299.99</p>
                    </div>
                </div>
                <p className='singleorder-price2'>$299.99</p>
            </div>

            <div className='singleorder-product-detail'>
                <div className='singleorder-detail'>
                    <img src={Pic3} alt="" />
                    <div className='singleorder-title-quantity'>
                        <p className='singleorder-title'>Premium Comfort Ergonomic Office Chair</p>
                        <p className='singleorder-quantity'>Qty: 1</p>
                        <p className='singleorder-quantity-price singleorder-quantity'>Price: $49.99</p>
                    </div>
                </div>
                <p className='singleorder-price2'>$49.99</p>
            </div>

            <hr className='myorder-hr-line'/>

            <div className='myorder-final-detail-container'>
                <div className='myorder-final-details'>
                    <p className='myorder-tracking-delivery'><span>Tracking: </span>TRK123456789</p>
                    <p className='myorder-tracking-delivery'><span>Estimated Delivery: </span>1/18/2024</p>
                </div>
                {status === 'delivery' && (
                    <button className='myorder-share-btn'><ShareIcon/><span>Share Item</span></button>
                )}
                {((status === 'shipped') || (status === 'processing')) && (
                    <button className='myorder-share-btn'><LocalShippingIcon/><span>Track Order</span></button>
                )}
            </div>
        </div>
    )
}

export default SingleOrder
