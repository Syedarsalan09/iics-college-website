import { randomUUID } from "node:crypto";
import Admission from "../models/Admission.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+() -]{7,20}$/;
const programs = new Set([
  "computer-applications",
  "business-studies",
  "science-research",
  "information-technology",
  "commerce",
  "applied-science",
  "other",
]);

export async function createAdmission(req, res) {
  const { fullName, email, phone, program, education, message = "" } =
    req.body ?? {};

  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof program !== "string" ||
    typeof education !== "string" ||
    typeof message !== "string" ||
    !fullName.trim() ||
    !emailPattern.test(email.trim()) ||
    !phonePattern.test(phone.trim()) ||
    !programs.has(program) ||
    !education.trim() ||
    fullName.trim().length > 100 ||
    email.trim().length > 254 ||
    education.trim().length > 150 ||
    message.length > 1000
  ) {
    return res.status(400).json({
      message: "Please provide valid admission inquiry details",
    });
  }

  try {
    const admission = await Admission.create({
      applicationNumber: `IICS-${randomUUID().toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      program,
      education: education.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Admission inquiry received",
      applicationNumber: admission.applicationNumber,
    });
  } catch (error) {
    console.error("Admission inquiry could not be saved:", error.message);
    return res.status(500).json({
      message: "Unable to submit admission inquiry. Please try again.",
    });
  }
}

export async function getAdmissions(req, res) {
  try {
    const admissions = await Admission.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json(admissions);
  } catch (error) {
    console.error("Admission inquiries could not be retrieved:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve admission inquiries",
    });
  }
}

export async function updateAdmissionStatus(req, res) {
  const { status } = req.body ?? {};
  const validStatuses = ["Pending", "Under Review", "Approved", "Rejected"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "A valid admission status is required",
    });
  }

  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!admission) {
      return res.status(404).json({
        message: "Admission inquiry not found",
      });
    }

    return res.json(admission);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid admission inquiry ID",
      });
    }

    console.error("Admission inquiry could not be updated:", error.message);
    return res.status(500).json({
      message: "Unable to update admission inquiry",
    });
  }
}
