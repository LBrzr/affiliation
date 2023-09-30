const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');

// models
const User = require('../models/user');
const AffiliationLink = require('../models/affiliation_link');
const { hashPassword, generateSalt } = require('../helpers');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLString },
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
        url: {
            type: GraphQLString, resolve(parent, args) {
                return `${process.env.AFFILIATION_LINK_BASE_URL}${parent.id}`
            }
        },
        user: {
            type: UserType, resolve(parent, args) {
                return User.findById(parent.user);
            }
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
                return User.findById(args.id);
            }
        },

        // affiliation link by id
        affiliationLink: {
            type: AffiliationLinkType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return AffiliationLink.findById(args.id);
            }
        },

        // user's affiliation links
        userAffiliationLinks: {
            type: new GraphQLList(AffiliationLinkType),
            args: {
                userId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return AffiliationLink.find({ user: args.userId });
            }
        },
    }
});

// mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // register user
        registerUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const salt = generateSalt();
                const user = new User({
                    name: args.name,
                    email: args.email,
                    authentication: {
                        password: hashPassword(salt, args.password),
                        salt: salt,
                    },
                });
                return user.save();
            }
        },

        // login user
        loginUser: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const user = User.findOne({ email: args.email });
                if (!user) {
                    throw new Error('User does not exist!');
                }
                const hashedPassword = hashPassword(user.authentication.salt, args.password);
                if (user.authentication.password !== hashedPassword) {
                    throw new Error('Password is incorrect!');
                }
                return user;
            },
        },

        // add affiliation link
        generateAffiliationLink: {
            type: AffiliationLinkType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const affiliationLink = new AffiliationLink({
                    name: args.name,
                    description: args.description,
                    user: args.userId,
                });
                return affiliationLink.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});