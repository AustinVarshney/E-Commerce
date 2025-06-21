import React from 'react'
import './Wishlist.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import WishlistProducts from '../../components/WishlistProducts/WishlistProducts';

const Wishlist = () => {
    return (
        <div className='Wishlist'>
            <div className='wishlist-titles'>
                <p className='wishlist-title'><FavoriteIcon />Wishlist</p>
                <p className='wishlist-saved-item'>4 items saved for later</p>
            </div>

            <WishlistProducts />
        </div>
    )
}

export default Wishlist
