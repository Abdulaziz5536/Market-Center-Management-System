import { Router } from "express";
import { addUnit, getUnit, getUnits, updateUnit, deleteUnit } from "../controllers/unit-controller";

const router = Router();

router.post("/", addUnit);
router.get("/:id", getUnit);
router.get("/", getUnits);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);

export default router;