import { Router } from "express";
import {
  createAdmission,
  getAdmissions,
  updateAdmissionStatus,
} from "../controllers/admissionController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", createAdmission);
router.get("/", protectAdmin, getAdmissions);
router.patch("/:id/status", protectAdmin, updateAdmissionStatus);

export default router;
