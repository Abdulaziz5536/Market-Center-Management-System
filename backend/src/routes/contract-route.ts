import { Router } from "express";
import {
  createContract,
  deleteContract,
  getContract,
  getContracts,
  updateContract,
} from "../controllers/contract-controller";

const router = Router();

router.post("/", createContract);
router.get("/", getContracts);
router.get("/:id", getContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

export default router;
