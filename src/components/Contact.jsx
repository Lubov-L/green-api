import React from 'react';

const Contact = ({phoneNumber}) => {
    return (
        <div href="#" className="contact">
            <img src="/image/contact.png" alt="Contact"/>
            <div className="p">{phoneNumber}</div>
        </div>
    );
};

export default Contact;