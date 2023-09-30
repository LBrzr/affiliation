import React from 'react';
import { cookies } from 'next/headers';
import User from '@/types/user';
import AffiliationLink from '@/types/affiliation_link';
import { userAffiliationLinksQuery } from '@/constants/queries';
import CreateAffiliationLink from './create_affiliation_link';

const Dashboard = async () => {
    // get client side cookies
    const cookieStore = cookies();
    console.log(cookieStore.toString());

    // get user data
    const fetchUser = async () => {
        const res = await fetch('http://localhost:8000/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
        });
        const user = await res.json() as User;
        console.log(user.name);
        return user;
    }
    const user = await fetchUser();

    // get user affilations
    const fetchAffilations = async () => {
        const res = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({
                query: userAffiliationLinksQuery,
                variables: {
                    userId: user._id,
                }
            })
        });
        const content = await res.json();
        const affiliations = content.data.userAffiliationLinks as AffiliationLink[];
        console.log(affiliations);
        return affiliations;
    }
    const affiliations = await fetchAffilations();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome <b>{user.name}</b> !</p>
            <p>Your email is <b>{user.email}</b></p>
            <p>Your Balance is <b>{user.balance} €</b></p>
            <div>
                <h2>Your Affiliations</h2>
                <CreateAffiliationLink user={user} />
                <ul>
                    {affiliations.map(affiliation => {
                        return (
                            <li key={affiliation._id}>
                                <p>{affiliation.name}</p>
                                <p>{affiliation.description}</p>
                                <a href={affiliation.url}>{affiliation.url}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;