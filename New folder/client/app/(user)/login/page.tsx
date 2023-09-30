'use client';
import React from 'react';


const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!username || !password) {
            return;
        }

        const body = JSON.stringify({
            email: username,
            password,
        });

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/dashboard';
                res.json().then(data => {
                    document.cookie = 'token=' + data.authentication.token + '; path=/' + '; expires=' + new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).toUTCString();
                    console.log(document.cookie);
                    console.log(data);
                });
            } else {
                res.json().then(data => {
                    setError(data.message);
                });
            }
        }).catch(err => {
            console.error(err);
            setError(err.message);
        });
    }
    return (
        <div>
            <form onSubmit={onLogin}>
                <label htmlFor="username">Username</label>
                <input required type="text" placeholder="john@gmail.com" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input required type="password" placeholder="123456" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login;