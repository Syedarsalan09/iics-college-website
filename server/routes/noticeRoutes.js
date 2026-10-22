import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getNotices,
  updateNotice,
} from "../controllers/directoryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getNotices);
router.post("/", protectAdmin, createNotice);
router.put("/:id", protectAdmin, updateNotice);
router.delete("/:id", protectAdmin, deleteNotice);

export default router;
