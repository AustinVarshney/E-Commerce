import './OutlineButton.css';

function Button({ ObName }) {
    return (
        <>
            <button className='outline-button'>
                <p >{ObName}</p>
            </button>
        </>
    )
}

export default Button;