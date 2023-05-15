import React, {useState} from 'react';

const ChatWindow = ({phoneNumber, idInstance, apiTokenInstance}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }

        console.log(phoneNumber);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chatId: phoneNumber + '@c.us',
                message: message
            })
        };

        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, requestOptions);
        const result = await response.json();
        console.log(result);

        setMessages([...messages, {text: message, sender: 'me'}]);
        setMessage('');
    };

    return (
        <div className="chat__window">
            <div className="chat__messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)}/>
                <button type="submit">send</button>
            </form>
        </div>
    );
};

export default ChatWindow;