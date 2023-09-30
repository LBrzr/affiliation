const express = require("express");
const { authentication } = require("./authentication");
const { affiliation } = require("./affiliation");
const { order } = require("./order");

const router = express.Router();

module.exports = () => {
    authentication(router);
    affiliation(router);
    order(router);
    return router;
};