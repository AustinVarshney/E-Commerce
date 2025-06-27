import React, {useState} from 'react'
import './Toggle.scss'

const Toggle = ({ toggled }) => {
    const [isToggled, setIsToggled] = useState(toggled);

    const callback = () => {
        setIsToggled(!isToggled);
    }

    return (
        <label className='toggle-btn'>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} className='toggle-input'/>
            <span className='toggle-span'/>
        </label>
    )
}

export default Toggle
