'use client';
import React from "react";

const Product = () => {
    const [message, setMessage] = React.useState('');
    const onBuy = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch('http://localhost:8000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(res => {
            if (res.status === 200) {
                console.log("do some");
            }
            res.json().then(data => {
                console.log(data);
                setMessage(data.message);
            });
        }).catch(err => {
            console.error(err);
        });
    }
    return (
        <div>
            <h1>Product</h1>
            <button onClick={onBuy}>buy</button>
            <p>{message}</p>
        </div>
    );
};

export default Product;