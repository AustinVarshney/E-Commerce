import { useEffect, useState } from 'react'
import MyOrdersPic from "../../assets/MyOrder.png"
import { getOrdersByUser } from '../../components/API/api'
import SingleOrder from '../../components/SingleOrder/SingleOrder'
import { useAuth } from '../../Context/AuthContext'
import "./MyOrders.scss"

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    console.log("Current user:", user);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?._id) {
                console.log("Fetching orders for user ID:", user._id);
                try {
                    const data = await getOrdersByUser(user._id);
                    console.log("Fetched orders:", data); // 👈 Add this
                    setOrders(data);
                } catch (err) {
                    console.error("Error fetching orders:", err);
                }
            }
        };
        fetchOrders();
    }, [user]);

    console.log("Orders:  ", orders);

    return (
        <div className='orders-page-container'>
            <p className='myorder-title'><img src={MyOrdersPic} alt="" />My Orders</p>
            <p className='myorder-track-title'>Track and manage your orders</p>

            {orders.length > 0 ? (
                <div>
                    {orders.map((order, index) => (
                        <SingleOrder key={index} order={order} />
                    ))}
                </div>
            ) : (
                <div className='no-wishlist-item'>No Orders yet</div>
            )}
        </div>
    );
}

export default MyOrders;
