const registerUserQuery = `
    mutation ($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

module.exports = { registerUserQuery };