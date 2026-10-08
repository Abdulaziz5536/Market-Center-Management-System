import { Router } from "express";
import { createTenant, getTenant, getTenants, updateTenant, deleteTenant } from "../controllers/tenant-controller";
import { adminOnly, authenticateUser } from "../middleware/admin-middleware";

const router = Router();

router.post("/", createTenant, adminOnly, authenticateUser);
router.get("/", getTenants, authenticateUser);
router.get("/:id", getTenant, authenticateUser);
router.put("/:id", updateTenant, adminOnly, authenticateUser);
router.delete("/:id", deleteTenant, adminOnly, authenticateUser);

export default router;

