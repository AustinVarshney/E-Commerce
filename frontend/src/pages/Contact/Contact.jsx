import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../../assets/contact.svg';
import { contact } from '../../components/API/api';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', mob_no: '', query: ''
    })

    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const contactMutation = useMutation({
        mutationFn: (formData) => contact(formData),
        onSuccess: (response) => {
            console.log("Contact On Success Called");
            console.log("Contact Form : ", response);

            toast.success("Message sent Successfully");
            setFormData({
                name: '', email: '', mob_no: '', query: ''
            })
        },

        onError: (error) => {
            console.error("Error", error);
            toast.error("Something went's wrong")
        }
    })

    const handleOnSubmit = (e) => {
        e.preventDefault();
        contactMutation.mutate(formData)
    }
    return (
        <div className="contact-outer-container">
            <div className="contact-heading">Contact Us</div>
            <div className='contact-main-content'>
                <div className='contact-logo'>
                    <img src={Logo} alt="contact-us-image" className='contact-logo-image' />
                </div>
                <div className='contact-fields'>
                    <TextField
                        className="white-textfield"
                        label="name"
                        variant="outlined"
                        color="success"
                        sx={{ width: '40ch' }}
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                    />
                    <TextField className="white-textfield" label="email" variant="outlined" sx={{ width: '40ch' }}
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                    />

                    <TextField className="white-textfield" label="mob. no." variant="outlined" sx={{ width: '40ch' }} name="mob_no"
                        value={formData.mob_no}
                        onChange={handleOnChange}
                    />

                    <TextField className="white-textfield" label="query" variant="outlined" sx={{ width: '40ch' }} name="query"
                        value={formData.query}
                        onChange={handleOnChange}
                    />

                    <button className='contact-submit' onClick={handleOnSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;