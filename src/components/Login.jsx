import React, { useState } from 'react';
import NewChat from "./NewChat";

const Login = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isIdInstanceValid, setIsIdInstanceValid] = useState(true);
    const [isApiTokenInstanceValid, setIsApiTokenInstanceValid] = useState(true);

    function validateIdInstance(id) {
        const regex = /^\d{1,10}$/;
        return regex.test(id);
    }

    function validateApiTokenInstance(token) {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(token);
    }

    function getLogin(event) {
        event.preventDefault();

        if (!validateIdInstance(idInstance) || !validateApiTokenInstance(apiTokenInstance)) {
            if (!validateIdInstance(idInstance)) {
                setIsIdInstanceValid(false);
                setIdInstance('');
            }

            if (!validateApiTokenInstance(apiTokenInstance)) {
                setIsApiTokenInstanceValid(false);
                setApiTokenInstance('');
            }

            return;
        }

        fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then((response) => {
                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    if (response.status === 401) {
                        setIsIdInstanceValid(false);
                        setIsApiTokenInstanceValid(false);
                    } else if (response.status === 404) {
                        setIsIdInstanceValid(false);
                    } else {
                        setIsIdInstanceValid(true);
                        setIsApiTokenInstanceValid(true);
                    }
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
                setIsIdInstanceValid(true);
                setIsApiTokenInstanceValid(true);
            });
    }

    if (isLoggedIn) {
        return <NewChat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />;
    }

    return (
        <div>
            <form onSubmit={getLogin} className="login__form">
                <label htmlFor="instance">idInstance</label>
                <input
                    id="instance"
                    type="text"
                    value={idInstance}
                    onChange={(event) => {
                        setIdInstance(event.target.value);
                        setIsIdInstanceValid(true);
                    }}
                />
                {!isIdInstanceValid && (
                    <div className="id__invalid">Введите корректный idInstance</div>
                )}
                <label htmlFor="token">apiTokenInstance</label>
                <input
                    id="token"
                    type="text"
                    value={apiTokenInstance}
                    onChange={(event) => {
                        setApiTokenInstance(event.target.value);
                        setIsApiTokenInstanceValid(true);
                    }}
                />
                {!isApiTokenInstanceValid && (
                    <div className="token__invalid">Введите корректный apiTokenInstance</div>
                )}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
