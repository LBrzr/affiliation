const { orderController } = require("../controllers/order");
const { isAffiliated } = require("../middlewares");

const order = (router) => {
    router.post("/order", isAffiliated, orderController);
    return router;
}

module.exports = { order };
