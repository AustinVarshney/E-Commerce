import React, { useState } from 'react'
import './FAQs.scss'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const faqData = [
    {
        question: "How long does the shipping take?",
        answer: "Lorem  Molestias, voluptas voluprum minus perspiciatis, adipisci labore odio aut esse similique a! Eos officiis dolores modi temporibus, quasi cumque."
    },
    {
        question: "What is the refund policy?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, voluptas voluptate inventore, maiores laborum minus perspiciatis, adipisci labore odio aut esse similique a! Eos officiis dolores modi temporibus, quasi cumque."
    },
    {
        question: "Do you ship across different cities?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, voluptas voluptate inventore, maiores laborum minus perspiciatis, adipisci labore odio aut esse similique a! Eos officiis dolores modi temporibus, quasi cumque."
    },
    {
        question: "How can I track my order?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, voluptas voluptate inventore, maiores laborum minus perspiciatis, adipisci labore odio aut esse similique a! Eos officiis dolores modi temporibus, quasi cumque."
    },
    {
        question: "What payment methods do you accept?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, voluptas voluptate inventore, maiores laborum minus perspiciatis, adipisci labore odio aut esse similique a! Eos officiis dolores modi temporibus, quasi cumque."
    },
];

const FAQs = () => {
    const [showFAQ, setShowFAQ] = useState(false);
    const [whichSectionOpen, setWhichSectionOpen] = useState(-1);

    const handleOption = (index) => {
        if (whichSectionOpen == -1) {
            setShowFAQ(!showFAQ);
            if (showFAQ == true) {
                setWhichSectionOpen(() => {
                    return index;
                })
            } else {
                setWhichSectionOpen(() => {
                    return -1;
                })
            }
        } else if (whichSectionOpen == index) {
            setShowFAQ(!showFAQ);
            setWhichSectionOpen(() => {
                return -1;
            })
        } else {
            setWhichSectionOpen(() => {
                return index;
            })
        }


    }

    return (
        <div className='FAQs'>
            <p className='faq-title'><ContactSupportIcon /> Frequently Asked Questions</p>

            <div className='faqs-part'>
                {faqData.map((faq, index) => (
                    <div className='faq-question-answer' key={index}>
                        <div className='faq-question' onClick={() => handleOption(index)}>
                            {faq.question} {whichSectionOpen == index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/>}
                        </div>
                        <div className={`faq-answer ${whichSectionOpen === index ? 'open' : ''}`}>
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FAQs
