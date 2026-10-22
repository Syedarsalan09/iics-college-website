import { Router } from "express";
import {
  createFaculty,
  deleteFaculty,
  getFaculty,
  updateFaculty,
} from "../controllers/directoryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getFaculty);
router.post("/", protectAdmin, createFaculty);
router.put("/:id", protectAdmin, updateFaculty);
router.delete("/:id", protectAdmin, deleteFaculty);

export default router;
