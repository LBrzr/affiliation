const express = require('express');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 8000;

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
import router from './router';

const app = express();
connectDB();

app.use(cors());
app.use(router())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server is listening on port ${port}`));