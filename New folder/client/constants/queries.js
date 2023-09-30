const registerUserQuery = `
    mutation ($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

const userAffiliationLinksQuery = `
    query ($userId: ID!) {
        userAffiliationLinks(userId: $userId) {
            id
            name
            description
            url
        }
    }
`;

const generateAffiliationLink = `
    mutation ($userId: ID!, $name: String, $description: String) {
        generateAffiliationLink(userId: $userId, name: $name, description: $description) {
            id
            name
            description
            url
        }
    }
`;

module.exports = { registerUserQuery, userAffiliationLinksQuery, generateAffiliationLink };