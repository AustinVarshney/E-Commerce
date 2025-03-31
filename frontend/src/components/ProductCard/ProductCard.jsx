import React from 'react'
import './ProductCard.scss'
import Pic1 from '../../assets/Pic1.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = () => {
    return (
        <div className='outer-ProductCard-containr'>
            <div className='image-ProCard'>
                <img src={Pic1} alt="Img not found" />
            </div>
            <div className='content-ProCard'>
                <div className='content-ProCard-1'>
                    <div className='discount-ProCard'>
                        <p>Up to x% off</p>
                    </div>
                    <div className='Favourite-ProCard'>
                        <VisibilityIcon className='favourite-1-ProCard' style={{ fontSize: '1.2rem', padding: '0.25rem' }}/>
                        <FavoriteBorderIcon className='favourite-2-ProCard' style={{ fontSize: '1.2rem', padding: '0.25rem' }} />
                    </div>
                </div>
                <div className='content-ProCard-2'>
                    <div className='heading-ProCard'>
                        <a href=''>Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max</a>
                    </div>
                    <div className='reviews-ProCard'>
                        <p className='stars-ProCard'>
                            <StarBorderIcon style={{ fontSize: '1.5rem' }} />
                            <StarBorderIcon style={{ fontSize: '1.5rem' }} />
                            <StarBorderIcon style={{ fontSize: '1.5rem' }} />
                            <StarBorderIcon style={{ fontSize: '1.5rem' }} />
                            <StarBorderIcon style={{ fontSize: '1.5rem' }} />
                        </p>
                        <p className='rate-ProCard'>5.0</p>
                        <p className='total-reviews-ProCard'>(455)</p>
                    </div>
                    <div className='two-more-options-ProCard'>
                        <div className='advanced-option-ProCard'>
                            <LocalShippingIcon style={{fontSize: '0.9rem'}}/> <p>Fast Delivery</p>
                        </div>
                        <div className='advanced-option-ProCard'>
                            <PaymentsIcon style={{fontSize: '0.9rem'}}/> <p>Best Price</p>
                        </div>
                    </div>
                </div>
                <div className='content-ProCard-3'>
                    <p className='price-ProCard'>$ 1,699</p>
                    <a href="" className='add-to-card-ProCard'><AddShoppingCartIcon style={{fontSize: '1.25rem'}}/> Add to cart</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
