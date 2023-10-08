# Affiliation Link Generator and Remuneration System

## Project Overview

The Affiliation Link Generator and Remuneration System is a web application built with Next.js for the frontend, Express for the backend, and GraphQL for efficient data management. The primary purpose of the project is to generate and handle affiliation links, allowing users to earn remuneration for referring customers. Integrated with Stripe, the system facilitates secure and seamless transactions for both referrers and customers.

## Features

1. **Affiliation Link Generation:**
   - Users can generate unique affiliation links associated with their accounts.
   - Generated links track referrals and provide remuneration for successful conversions.

2. **Remuneration Handling with Stripe:**
   - Integration with Stripe for secure payment processing.
   - Referrers receive remuneration for each successful product purchase made through their affiliation link.

3. **User Authentication:**
   - Secure user authentication to ensure that only authorized users can generate affiliation links and access remuneration details.

4. **Dashboard and Reporting:**
   - Dashboard to track affiliation link performance and earnings.

5. **GraphQL API:**
   - Efficient data management with GraphQL, providing a flexible and powerful API for frontend-backend communication.

## Technologies Used

- **Next.js:** A React framework for building server-rendered and static web applications.

- **Express:** A web application framework for Node.js to build the backend server.

- **GraphQL:** A query language and runtime for APIs, providing a more efficient and powerful alternative to REST.

- **Stripe:** A secure and reliable payment processing platform.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

Second, run the client front app server:

```
cd ./client

# then

npm run dev
# or
yarn dev
# or
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Client app architecture

The client app architecture is like the following:

## App / Home Page :

* It is the app entry point which lead to either Login or Registration Pages.

## Registration Page :

* Allow user to create an account then login.

## Login Page :

* Allow user to login the app via his email and password.

## Dashboard :

* Show user details and all his previously created affiliation links and contains a form to generate new one.

## Products Page :

* It's a page listing all available products from client to purchase.
* This page is accessible directly at [/product](http://localhost:3000/product) or by clicking on an affiliation link, which in that case will pay back the link's owner on purchase occurence.

## That's all folks !

### Thanks !

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
