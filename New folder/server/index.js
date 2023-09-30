const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 8000;

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const router = require('./router');
const { isAuthenticated } = require('./middlewares');

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

// parse some custom thing into a Buffer
app.use(bodyParser.raw())

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());

app.use(router())

app.use('/graphql', isAuthenticated, graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server is listening on port ${port}`));