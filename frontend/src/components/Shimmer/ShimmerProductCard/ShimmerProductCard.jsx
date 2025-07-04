import './ShimmerProductCard.scss';

const ShimmerProductCard = () => {
    return (
        <div className="outer-ProductCard-containr shimmer">
            <div className="image-ProCard shimmer-bg" />

            <div className="content-ProCard">
                <div className="content-ProCard-1">
                    <div className="discount-ProCard shimmer-bg" />
                    <div className="Favourite-ProCard">
                        <div className="circle shimmer-bg" />
                        <div className="circle shimmer-bg" />
                    </div>
                </div>

                <div className="content-ProCard-2">
                    <div className="heading-ProCard shimmer-bg" />

                    <div className="reviews-ProCard">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="star shimmer-bg" />
                        ))}
                    </div>

                    <div className="two-more-options-ProCard">
                        <div className="advanced-option-ProCard shimmer-bg" />
                        <div className="advanced-option-ProCard shimmer-bg" />
                    </div>
                </div>

                <div className="content-ProCard-3">
                    <div className="price shimmer-bg" />
                    <div className="add-to-cart shimmer-bg" />
                </div>
            </div>
        </div>
    );
};

export default ShimmerProductCard;
