import './DetailsInfoCard.css'
function DetailsInfoCard({ Heading, number, image }) {
    return (
        <div className="info-card">
            <div>
                <div>{Heading}</div>
                <img src={image} alt="" />
            </div>
            <p>{number}</p>
        </div>
    )
}

export default DetailsInfoCard