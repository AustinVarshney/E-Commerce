import './Button.css';

function Button({ bName }) {
    return (
        <>
            <button className='button'>
                <p >{bName}</p>
            </button>
        </>
    )
}

export default Button;