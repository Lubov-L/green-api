import React, {useState} from 'react';
import Chat from "./Chat";

const Login = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    function getLogin(event) {
        event.preventDefault();

        fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem('idInstance', idInstance);
                localStorage.setItem('apiTokenInstance', apiTokenInstance);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            {localStorage.getItem('idInstance') && localStorage.getItem('apiTokenInstance') ? (
                <Chat/>
            ) : (
                <form onSubmit={getLogin} className="login__form">
                    <label htmlFor="instance">idInstance</label>
                    <input id="instance" type="text" value={idInstance}
                           onChange={(event) => setIdInstance(event.target.value)}/>
                    <label htmlFor="token">apiTokenInstance</label>
                    <input id="token" type="text" value={apiTokenInstance}
                           onChange={(event) => setApiTokenInstance(event.target.value)}/>
                    <button type="submit">Войти</button>
                </form>
            )}
        </div>
    );
};

export default Login;