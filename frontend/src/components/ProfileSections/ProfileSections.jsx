import React, { useState } from 'react'
import './ProfileSections.scss'
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import Preference from '../Preference/Preference';
import SecutiryInfo from '../SecutiryInfo/SecutiryInfo';
import BillingInfo from '../BillingInfo/BillingInfo';

const ProfileSections = () => {
    let [whichSectionOpen, setWhichSectionOpen] = useState(1);

    return (
        <div className='profile-sections'>
            <div className='profile-options'>
                <div onClick={() => setWhichSectionOpen(1)} className={`${whichSectionOpen == 1 ? 'active-profile-option' : ''}`} style={whichSectionOpen == 1 ? { color: "black" } : {}}>Personal Info</div>
                <div onClick={() => setWhichSectionOpen(2)} className={`${whichSectionOpen == 2 ? 'active-profile-option' : ''}`} style={whichSectionOpen == 2 ? { color: "black" } : {}}>Preferences</div>
                <div onClick={() => setWhichSectionOpen(3)} className={`${whichSectionOpen == 3 ? 'active-profile-option' : ''}`} style={whichSectionOpen == 3 ? { color: "black" } : {}}>Security</div>
                <div onClick={() => setWhichSectionOpen(4)} className={`${whichSectionOpen == 4 ? 'active-profile-option' : ''}`} style={whichSectionOpen == 4 ? { color: "black" } : {}}>Billing</div>
            </div>

            {whichSectionOpen == 1 && <PersonalInfo/>}
            {whichSectionOpen == 2 && <Preference/>}
            {whichSectionOpen == 3 && <SecutiryInfo/>}
            {whichSectionOpen == 4 && <BillingInfo/>}
        </div>
    )
}

export default ProfileSections
