import { Router } from "express";
import { register, login, getRegister } from "../controllers/user-controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/show", getRegister );

export default router;