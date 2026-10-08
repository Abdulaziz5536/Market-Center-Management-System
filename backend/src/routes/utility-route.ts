import { Router } from "express";
import { createUtility, deleteUtility, getUtilities, getUtility, updateUtility } from "../controllers/utility-controller";
import { adminOnly, authenticateUser } from "../middleware/admin-middleware";
const router = Router();
router.post("/", createUtility, adminOnly, authenticateUser);
router.get("/", getUtilities, authenticateUser);
router.get("/:id", getUtility, authenticateUser);
router.put("/:id", updateUtility, adminOnly, authenticateUser);
router.delete("/:id", deleteUtility, adminOnly, authenticateUser);

export default router;
