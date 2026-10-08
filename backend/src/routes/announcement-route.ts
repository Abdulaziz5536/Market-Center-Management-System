import { Router } from "express";

import { createAnnouncement, getAnnouncements, getAnnouncement, updateAnnouncement, deleteAnnouncement,
} from "../controllers/announcement-controller";

import { adminOnly, authenticateUser } from "../middleware/admin-middleware";

const router = Router();

router.post("/", createAnnouncement, adminOnly, authenticateUser);
router.get("/", getAnnouncements, authenticateUser);
router.get("/:id", getAnnouncement, authenticateUser);
router.put("/:id", updateAnnouncement, adminOnly, authenticateUser);
router.delete("/:id", deleteAnnouncement, adminOnly, authenticateUser);

export default router;