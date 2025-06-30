import './Button.css';

function Button({ bName }) {
    return (
        <>
            <button className='dark-button'>
                <p >{bName}</p>
            </button>
        </>
    )
}

export default Button;