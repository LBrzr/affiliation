const { registerController, loginController, meController } = require("../controllers/authentication");
const { isAuthenticated } = require("../middlewares");

const authentication = (router) => {
    router.post("/auth/login", loginController);
    router.post("/auth/register", registerController);
    router.get("/auth/me", isAuthenticated, meController);
    return router;
}

module.exports = { authentication };
