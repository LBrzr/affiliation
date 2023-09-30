'use client';
import Product from "@/types/product";
import { checkout } from "@/utils/get_stripe";
import React from "react";

const Products = () => {
    const [message, setMessage] = React.useState('');

    const products: Product[] = [
        {
            _id: 'price_1Nw2hvBlmBMbCUsZWxVytJ4h',
            name: 'Product 1',
            price: 10,
        }, {
            _id: 'price_1Nw2iKBlmBMbCUsZHGMkNV6w',
            name: 'Product 2',
            price: 20,
        }, {
            _id: 'price_1Nw2icBlmBMbCUsZCdOMxiC4',
            name: 'Product 3',
            price: 30,
        },
    ];

    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <div key={product._id}>
                    <p>{product.name} - {product.price} €</p>
                    <button onClick={(e) => checkout(product)}>Buy</button>
                </div>
            ))}
            <p>{message}</p>
        </div>
    );
};

export default Products;