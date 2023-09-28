const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
    },
];

const affiliationLinks = [
    {
        id: '1',
        name: 'Google',
        description: 'Google',
        url: 'https://www.google.com',
        postedBy: '1',
    },
    {
        id: '2',
        name: 'Facebook',
        description: 'Facebook',
        url: 'https://www.facebook.com',
        postedBy: '2',
    },
];

const affiliationVotes = [
    {
        id: '1',
        user: '1',
        affiliationLink: '1',
    },
    {
        id: '2',
        user: '1',
        affiliationLink: '2',
    },
    {
        id: '3',
        user: '2',
        affiliationLink: '1',
    },
];

module.exports = {
    users,
    affiliationLinks,
    affiliationVotes,
};