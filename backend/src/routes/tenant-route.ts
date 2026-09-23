import { Router } from "express";
import { createTenant, getTenant, getTenants, updateTenant, deleteTenant } from "../controllers/tenant-controller";


const router = Router();

router.post("/", createTenant);
router.get("/", getTenants);
router.get("/:id", getTenant);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;

