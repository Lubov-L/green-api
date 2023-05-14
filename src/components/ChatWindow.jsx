import React, {useState, useEffect} from 'react';

const ChatWindow = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch the initial messages from the server here
    }, []);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }

        const idInstance = localStorage.getItem('idInstance');
        const apiTokenInstance = localStorage.getItem('apiTokenInstance');
        const phoneNumber = localStorage.getItem('phoneNumber');

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