import { Router } from "express";
// import { prisma } from "../dbClient";
import UserController from "../controllers/userController";
import { authRequired } from "../middlewares/validateToken";
const router = Router();
const userController=new UserController();
router.post("/out",authRequired,userController.handleLogOut.bind(userController));
router.get("/",authRequired,userController.handleGetUsers.bind(userController));

router.get("/profile",authRequired,userController.getPerfil.bind(userController));

router.get("/register", (_req, res) => {
    res.render('./usuarios/register.ejs');
});

router.post("/register",userController.handleRegisterUser.bind(userController));

router.get('/login', (_req, res) => {
    res.render("./usuarios/login.ejs")
})

router.post("/login",userController.handleLoginUser.bind(userController));


router.get("/:id",userController.handleGetUsersByID.bind(userController))
export default router