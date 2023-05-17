import React, {useState} from 'react';
import ChatWindow from "./ChatWindow";

const NewChat = ({idInstance, apiTokenInstance}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isChatCreated, setIsChatCreated] = useState(false);

    const handleCreateChat = () => {

        const isValidPhoneNumber = /^\d{8,13}$/.test(phoneNumber);
        if (isValidPhoneNumber) {
            localStorage.setItem('phoneNumber', phoneNumber);

            setPhoneNumber('');
            setIsPhoneNumberValid(true);
            setIsChatCreated(true);
        } else {
            setIsPhoneNumberValid(false);
        }
    };

    if (isChatCreated) {
        return (<div className="chat">
            <ChatWindow idInstance={idInstance} apiTokenInstance={apiTokenInstance}/>
        </div>)
    }

    return (
        <div>
            <div className="chat__new">
                <label htmlFor="newchat">Введите номер телефона</label>
                <input
                    maxLength={13}
                    type="text"
                    value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)}
                />
                {!isPhoneNumberValid && (<div className="number__invalid">Введите корректный номер телефона</div>)}
                <button type="submit" onClick={handleCreateChat}>создать чат</button>
            </div>
        </div>
    );
};

export default NewChat;