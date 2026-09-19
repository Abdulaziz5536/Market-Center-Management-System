import { Router } from "express";
import { protect } from "../middleware/user-middleware";

const router = Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    userId: req.userId,
  });
});

export default router;