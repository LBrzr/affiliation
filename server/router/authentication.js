import { registerController, loginController } from "../controllers/authentication";

export default (router) => {
    router.get("/login", loginController);
    router.post("/register", registerController);
    return router;
}
