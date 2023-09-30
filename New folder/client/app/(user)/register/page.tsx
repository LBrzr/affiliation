'use client';
import React from 'react';
import { registerUserQuery } from '../../../constants/queries';


const Register = () => {
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const onRegister = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!username || !password) {
            return;
        }
        /* const body = JSON.stringify({
            query: registerUserQuery,
            variables: {
                name,
                email: username,
                password,
            }
        }); */

        const body = JSON.stringify({
            name,
            email: username,
            password,
        });

        fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/login';
            }
            res.json().then(data => {
                console.log(data);
                setError(data.message);
            });
        }).catch(err => {
            console.error(err);
            setError(err.message);
        });
    }
    return (
        <div>
            <form onSubmit={onRegister}>
                <label htmlFor="name">Name</label>
                <input required type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="username">Username</label>
                <input required type="text" placeholder="john@gmail.com" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input required type="password" placeholder="123456" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Register;