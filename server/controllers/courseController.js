
import Course from "../models/Course.js";

export async function getCourses(req, res) {
  try {
    const courses = await Course.find({ published: true }).sort({
      createdAt: -1,
    });

    res.json(courses);
  } catch {
    res.status(500).json({
      message: "Unable to retrieve courses",
    });
  }
}

export async function getCourseBySlug(req, res) {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch {
    res.status(500).json({
      message: "Unable to retrieve course",
    });
  }
}

export async function getAdminCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch {
    res.status(500).json({
      message: "Unable to retrieve courses",
    });
  }
}

export async function createCourse(req, res) {
  try {
    const {
      title,
      slug,
      category,
      description,
      duration,
      eligibility,
      fees,
      image,
      subjects,
      published,
    } = req.body;

    if (!title || !slug || !category || !description) {
      return res.status(400).json({
        message: "Title, slug, category, and description are required",
      });
    }

    const course = await Course.create({
      title,
      slug,
      category,
      description,
      duration,
      eligibility,
      fees,
      image,
      subjects,
      published,
    });

    res.status(201).json(course);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A course with this slug already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Unable to create course",
    });
  }
}

export async function updateCourse(req, res) {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Unable to update course",
    });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course deleted successfully",
    });
  } catch {
    res.status(500).json({
      message: "Unable to delete course",
    });
  }
}
