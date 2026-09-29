import { Router } from "express";
import { createUtility, deleteUtility, getUtilities, getUtility, updateUtility } from "../controllers/utility-controller";

const router = Router();
router.post("/", createUtility);
router.get("/", getUtilities);
router.get("/:id", getUtility);
router.put("/:id", updateUtility);
router.delete("/:id", deleteUtility);

export default router;
