import { Router } from "express";
import {
    authLogin,
    authRegister,
    authLogout,
    authUser,
} from "../controllers/authController.js";

const router = Router();

router.get("/whoami", authUser);

router.post("/auth", authLogin);

router.post("/logout", authLogout);

router.post("/register", authRegister);

export default router;
