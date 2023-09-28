const { users, affiliationLinks, affiliationVotes } = require('./sample_data');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');

// models
const User = require('../models/user');
const AffiliationLink = require('../models/affiliation_link');
const AffiliationVote = require('../models/affiliation_vote');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
});

// AffiliationLink Type
const AffiliationLinkType = new GraphQLObjectType({
    name: 'AffiliationLink',
    description: 'Documentation for affiliation link...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        postedBy: {
            type: UserType, resolve(parent, args) {
                return users.find(user => user.id === parent.postedBy);
            }
        },
    })
});

// AffiliationVote Type
const AffiliationVoteType = new GraphQLObjectType({
    name: 'AffiliationVote',
    description: 'Documentation for affiliation vote...',
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType, resolve(parent, args) {
                return users.find(user => user.id === parent.user);
            },
        },
        affiliationLink: {
            type: AffiliationLinkType, resolve(parent, args) {
                return affiliationLinks.find(affiliationLink => affiliationLink.id === parent.affiliationLink);
            },
        },
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        // user by id
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return users.find(user => user.id === args.id);
            }
        },

        // affiliation link by id
        affiliationLink: {
            type: AffiliationLinkType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return affiliationLinks.find(affiliationLink => affiliationLink.id === args.id);
            }
        },

        // affiliation vote by id
        affiliationVote: {
            type: AffiliationVoteType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return affiliationVotes.find(affiliationVote => affiliationVote.id === args.id);
            }
        },

        // user's affiliation links
        userAffiliationLinks: {
            type: new GraphQLList(AffiliationLinkType),
            args: {
                userId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return affiliationLinks.filter(affiliationLink => affiliationLink.postedBy === args.userId);
            }
        },

        // affiliation link's votes
        affiliationLinkVotes: {
            type: new GraphQLList(AffiliationVoteType),
            args: {
                affiliationLinkId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return affiliationVotes.filter(affiliationVote => affiliationVote.affiliationLink === args.affiliationLinkId);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});