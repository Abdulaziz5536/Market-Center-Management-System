import { Router } from "express";
import { addUnit, getUnit, getUnits, updateUnit, deleteUnit } from "../controllers/unit-controller";
import {adminOnly, authenticateUser} from "../middleware/admin-middleware"

const router = Router();

router.post("/", addUnit, adminOnly, authenticateUser);
router.get("/:id", getUnit, authenticateUser);
router.get("/", getUnits, authenticateUser);
router.put("/:id", updateUnit, adminOnly, authenticateUser);
router.delete("/:id", deleteUnit, adminOnly, authenticateUser);

export default router;