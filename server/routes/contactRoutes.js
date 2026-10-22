import { Router } from "express";
import {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", createContactMessage);
router.get("/", protectAdmin, getContactMessages);
router.patch("/:id/status", protectAdmin, updateContactMessageStatus);

export default router;
