import React, { useState, useEffect } from 'react';
import Contact from "./Contact";

const ChatWindow = ({ idInstance, apiTokenInstance }) => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const currentPhoneNumber = localStorage.getItem('phoneNumber');

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: currentPhoneNumber + '@c.us',
                message: message
            })
        };

        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, requestOptions);
        const result = await response.json();
        console.log(result);

        setAllMessages(prevMessages => [...prevMessages, { text: message, sender: 'me' }]);
        setMessage('');
    };

    const receiveMessages = async () => {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`);
        const result = await response.json();

        if (result) {
            console.log(result.receiptId);
            console.log(result.body.typeWebhook);
            await deleteNotification(result.receiptId)

            if (result.body.typeWebhook === 'incomingMessageReceived') {
                setAllMessages(prevMessages => [...prevMessages, { text: result.body.messageData.textMessageData.textMessage, sender: 'not me' }]);
            }
        }
    };

    const deleteNotification = async (receiptId) => {
        const requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, requestOptions);
        const result = await response.json();

        console.log(result);
    };

    useEffect(() => {
        receiveMessages().then(r => []);
        const interval = setInterval(receiveMessages, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [receiveMessages]);

    return (
        <div className="chat__window">
            <div className="chats">
                <Contact phoneNumber={currentPhoneNumber} />
            </div>
            <div className="chat__messages">
                {allMessages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
                <button type="submit">send</button>
            </form>
        </div>
    );
};

export default ChatWindow;
