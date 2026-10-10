
import { Router } from "express";

import { register, login, getRegister } from "../controllers/user-controller";

import {
  protect,
  adminOnly,
} from "../middleware/user-middleware";

const router = Router();


router.post("/login", login);


router.get("/", protect, adminOnly, getRegister);
router.post("/register", protect, adminOnly, register);
router.put("/:id", protect, adminOnly);
router.delete("/:id", protect, adminOnly);

export default router;
