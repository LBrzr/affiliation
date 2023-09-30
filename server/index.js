const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 8000;

const stripe = require('stripe')(process.env.STRIPE_SK);

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const router = require('./router');
const { isAuthenticated } = require('./middlewares');

const app = express();
connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
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

/* 
const endpointSecret = "whsec_el7PyE79hlSZQQF2KcQZNSkXLYTreNom";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}); */

app.listen(port, console.log(`Server is listening on port ${port}`));