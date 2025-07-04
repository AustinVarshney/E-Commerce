import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { contact } from '../API/api';
import './Contact.scss';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TelegramIcon from '@mui/icons-material/Telegram';

function Contact() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [defaultText, setDefaultText] = useState("Select Category");

    const handleCategoryOption = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const handleOption = (option) => {
        setDefaultText((prevText) => {
            handleCategoryOption();
            return option;
        })
    }
    // const [formData, setFormData] = useState({
    //     name: '', email: '', mob_no: '', query: ''
    // })

    // const handleOnChange = (e) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    // const contactMutation = useMutation({
    //     mutationFn: (formData) => contact(formData),
    //     onSuccess: (response) => {
    //         console.log("Contact On Success Called");
    //         console.log("Contact Form : ", response);

    //         toast.success("Message sent Successfully");
    //         setFormData({
    //             name: '', email: '', mob_no: '', query: ''
    //         })
    //     },

    //     onError: (error) => {
    //         console.error("Error", error);
    //         toast.error("Something went's wrong")
    //     }
    // })

    // const handleOnSubmit = (e) => {
    //     e.preventDefault();
    //     contactMutation.mutate(formData)
    // }

    return (
        // <div className="contact-outer-container">
        //     <div className="contact-heading">Contact Us</div>
        //     <div className='contact-main-content'>
        //         <div className='contact-logo'>
        //             <img src={Logo} alt="contact-us-image" className='contact-logo-image' />
        //         </div>
        //         <div className='contact-fields'>
        //             <TextField
        //                 className="white-textfield"
        //                 label="name"
        //                 variant="outlined"
        //                 color="success"
        //                 sx={{ width: '40ch' }}
        //                 name="name"
        //                 value={formData.name}
        //                 onChange={handleOnChange}
        //             />
        //             <TextField className="white-textfield" label="email" variant="outlined" sx={{ width: '40ch' }}
        //                 name="email"
        //                 value={formData.email}
        //                 onChange={handleOnChange}
        //             />

        //             <TextField className="white-textfield" label="mob. no." variant="outlined" sx={{ width: '40ch' }} name="mob_no"
        //                 value={formData.mob_no}
        //                 onChange={handleOnChange}
        //             />

        //             <TextField className="white-textfield" label="query" variant="outlined" sx={{ width: '40ch' }} name="query"
        //                 value={formData.query}
        //                 onChange={handleOnChange}
        //             />

        //             <button className='contact-submit' onClick={handleOnSubmit}>Submit</button>
        //         </div>
        //     </div>
        // </div>

        <div className='contact'>
            <p className='contact-heading'>Contact Us</p>
            <p className='contact-description'>We're here to help. Get in touch with our support team.</p>

            <div className='contact-us'>
                <div className='get-in-touch'>
                    <p className='get-in-touch-heading'><HeadsetMicIcon /> Get in Touch</p>

                    <div className='get-info'>
                        <div className='get-info-icon'>
                            <MailOutlineIcon />
                        </div>
                        <div className='get-information'>
                            <p className='get-info-title'>Email</p>
                            <p className='get-info-description'>abc1234@gmail.com</p>
                        </div>
                    </div>

                    <div className='get-info'>
                        <div className='get-info-icon'>
                            <CallIcon />
                        </div>
                        <div className='get-information'>
                            <p className='get-info-title'>Contact No.</p>
                            <p className='get-info-description'>1234567890</p>
                        </div>
                    </div>

                    <div className='get-info'>
                        <div className='get-info-icon'>
                            <QueryBuilderIcon />
                        </div>
                        <div className='get-information'>
                            <p className='get-info-title'>Business Hours</p>
                            <p className='get-info-description'>Mon-Fri: 8AM-7PM <br />Sat-Sun: 12AM-6PM</p>
                        </div>
                    </div>
                </div>

                <div className='send-message'>
                    <p className='message-heading'>Send Us a Message</p>
                    <p className='message-description'>Fill out the form below and we'll get back to you as soon as possible.</p>

                    <div className='contact-fields'>
                        <div className='contact-name'>
                            <label htmlFor="contact-name" className='contact-name-title'>Full Name</label>
                            <input type="text" to='contact-name' className='contact-name-input' />
                        </div>
                        <div className='contact-name'>
                            <label htmlFor="contact-email" className='contact-name-title'>Email Address</label>
                            <input type="text" to='contact-email' className='contact-name-input' />
                        </div>
                    </div>

                    <div className='contact-fields'>
                        <div className='contact-name contact-category-option'>
                            <label htmlFor="contact-email" className='contact-name-title'>Category</label>
                            <div className='contact-name-input contact-category' onClick={handleCategoryOption}>{defaultText} {isCategoryOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/>}</div>
                            {isCategoryOpen &&
                                <div className='category-options'>
                                    <p onClick={() => { handleOption("Option 1") }}>Option 1</p>
                                    <p onClick={() => { handleOption("Option 2") }}>Option 2</p>
                                    <p onClick={() => { handleOption("Option 3") }}>Option 3</p>
                                    <p onClick={() => { handleOption("Option 4") }}>Option 4</p>
                                </div>}
                        </div>
                        <div className='contact-name'>
                            <label htmlFor="contact-subject" className='contact-name-title'>Subject</label>
                            <input type="text" to='contact-subject' className='contact-name-input' />
                        </div>
                    </div>

                    <div className='contact-fields'>
                        <div className='contact-name contact-message'>
                            <label htmlFor="contact-email" className='contact-name-title'>Message</label>
                            <textarea type="text" to='contact-email' className='contact-name-input contact-message-input' placeholder='Please describe your inquiry in detail..' />
                        </div>
                    </div>

                    <button className='send-message-btn'><TelegramIcon/> Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;