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
