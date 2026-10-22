
import { Router } from "express";

import {
  getCourses,
  getCourseBySlug,
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Public endpoints
router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

// Protected admin endpoints
router.get("/admin/all", protectAdmin, getAdminCourses);
router.post("/", protectAdmin, createCourse);
router.put("/:id", protectAdmin, updateCourse);
router.delete("/:id", protectAdmin, deleteCourse);

export default router;
