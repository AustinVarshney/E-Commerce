import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestoreIcon from '@mui/icons-material/Restore';
import ShareIcon from '@mui/icons-material/Share';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './SingleOrder.scss';

const SingleOrder = ({ order }) => {
    const { _id, items, totalAmount, status, date } = order;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='singleorder-container'>
            <div className='singleorder-info'>
                <div className='singleorder-id-date'>
                    <p className='singleorder-id'>Order #{_id.slice(-6)}</p>
                    <p className='singleorder-date'>Placed on {formatDate(date)}</p>
                </div>
                <div className='singleorder-status-price'>
                    {status === 'delivered' && (
                        <p className='singleorder-status status-delivery'><TaskAltIcon /> Delivered</p>
                    )}
                    {status === 'shipped' && (
                        <p className='singleorder-status status-shipped'><LocalShippingIcon /> Shipped</p>
                    )}
                    {status === 'processing' && (
                        <p className='singleorder-status status-processing'><RestoreIcon /> Processing</p>
                    )}
                    <p className='singleorder-price'>₹{totalAmount}</p>
                </div>
            </div>

            <hr className='myorder-hr-line' />

            {items.map((item, idx) => (
                <div className='singleorder-product-detail' key={idx}>
                    <div className='singleorder-detail'>
                        {/* Optional: Use item.image if available, else a fallback */}
                        <img src={`/default-product.png`} alt="" />
                        <div className='singleorder-title-quantity'>
                            <p className='singleorder-title'>{item.name}</p>
                            <p className='singleorder-quantity'>Qty: {item.quantity}</p>
                            <p className='singleorder-quantity-price singleorder-quantity'>
                                Price: ₹{item.price}
                            </p>
                        </div>
                    </div>
                    <p className='singleorder-price2'>₹{item.price * item.quantity}</p>
                </div>
            ))}

            <hr className='myorder-hr-line' />

            <div className='myorder-final-detail-container'>
                <div className='myorder-final-details'>
                    <p className='myorder-tracking-delivery'><span>Tracking:</span> TRK{_id.slice(0, 6).toUpperCase()}</p>
                    <p className='myorder-tracking-delivery'>
                        <span>Estimated Delivery:</span> {formatDate(new Date(new Date(date).getTime() + 3 * 24 * 60 * 60 * 1000))}
                    </p>
                </div>

                {status === 'delivered' ? (
                    <button className='myorder-share-btn'><ShareIcon /><span>Share Item</span></button>
                ) : (
                    <button className='myorder-share-btn'><LocalShippingIcon /><span>Track Order</span></button>
                )}
            </div>
        </div>
    );
};

export default SingleOrder;
