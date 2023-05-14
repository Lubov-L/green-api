import React, {useState} from 'react';
import Contact from './Contact';
import ChatWindow from "./ChatWindow";

const Chat = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [chats, setChats] = useState([]);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const handleCreateChat = () => {

        const isValidPhoneNumber = /\d{8,13}$/.test(phoneNumber);
        if (isValidPhoneNumber) {
            localStorage.setItem('phoneNumber', phoneNumber);

            setChats(prevChats => [...prevChats, {phoneNumber}]);
            setPhoneNumber('');
            setIsPhoneNumberValid(true);
        } else {
            setIsPhoneNumberValid(false);
        }
    };

    return (
        <div className="chat">
            <div>
                <div className="chat__new">
                    <label htmlFor="newchat">Введите номер телефона</label>
                    <input
                        maxLength={13}
                        type="text"
                        value={phoneNumber}
                        onChange={event => setPhoneNumber(event.target.value)}
                    />
                    {!isPhoneNumberValid && (
                        <div className="number__invalid">Введите корректный номер телефона</div>
                    )}
                    <button onClick={handleCreateChat}>создать чат</button>
                </div>
                <div className="chats">
                    {chats.map((chat, index) => (
                        <Contact key={index} phoneNumber={chat.phoneNumber}/>
                    ))}
                </div>
            </div>
            <div>
                <ChatWindow phoneNumber={phoneNumber}/>
            </div>
        </div>
    );
};

export default Chat;