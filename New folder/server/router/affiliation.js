const { affiliationController } = require("../controllers/affiliation");

const affiliation = (router) => {
    router.get("/affiliation/:code", affiliationController);
    return router;
}

module.exports = { affiliation };
