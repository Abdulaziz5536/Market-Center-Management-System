import { Router } from "express";
import { createContract, deleteContract, getContract, getContracts, updateContract,} from "../controllers/contract-controller";
import { adminOnly, authenticateUser } from "../middleware/admin-middleware";
const router = Router();

router.post("/", createContract, adminOnly, authenticateUser);
router.get("/", getContracts, authenticateUser);
router.get("/:id", getContract, authenticateUser);
router.put("/:id", updateContract, adminOnly, authenticateUser);
router.delete("/:id", deleteContract, adminOnly, authenticateUser);

export default router;
