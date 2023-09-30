const { orderController } = require("../controllers/order");
const { isAffiliated } = require("../middlewares");

const order = (router) => {
    router.get("/order/:price", isAffiliated, orderController);
    return router;
}

module.exports = { order };