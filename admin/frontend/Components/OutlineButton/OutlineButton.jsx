import './OutlineButton.css';

function Button({ ObName, type = "button", onClick }) {
    return (
        <>
            <button className='outline-button' type={type} onClick={onClick}>
                <p >{ObName}</p>
            </button>
        </>
    )
}

export default Button;