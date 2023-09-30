'use client';
import { generateAffiliationLink } from "@/constants/queries";
import React from "react";

const CreateAffiliationLink = ({ user }): React.ReactElement => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const onGenerate = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                query: generateAffiliationLink,
                variables: {
                    name,
                    description,
                    userId: user._id,
                }
            })
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/dashboard';
            }
            res.json().then(data => {
                console.log(data);
            });
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <form onSubmit={onGenerate}>
            <label htmlFor="name">Name</label>
            <input required type="text" placeholder="youtube" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="description">Description</label>
            <input type="text" placeholder="youtube affiliation link" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Generate</button>
        </form>
    );
};

export default CreateAffiliationLink;