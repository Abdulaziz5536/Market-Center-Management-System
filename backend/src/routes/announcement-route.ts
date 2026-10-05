import { Router } from "express";

import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement-controller";

const router = Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.get("/:id", getAnnouncement);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;