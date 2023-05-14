import React from 'react';

const Contact = ({phoneNumber}) => {
    return (
        <a href="#" className="contact">
            <img src="/image/contact.png" alt="Contact"/>
            <div className="p">{phoneNumber}</div>
        </a>
    );
};

export default Contact;