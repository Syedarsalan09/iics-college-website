import Faculty from "../models/Faculty.js";
import Notice from "../models/Notice.js";

function pickFields(body, fields) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  return Object.fromEntries(
    fields
      .filter((field) => Object.hasOwn(body, field))
      .map((field) => [field, body[field]])
  );
}

async function createRecord(Model, req, res, fields, label) {
  try {
    const record = await Model.create(pickFields(req.body, fields));
    return res.status(201).json(record);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(`${label} could not be created:`, error.message);
    return res.status(500).json({
      message: `Unable to create ${label.toLowerCase()}`,
    });
  }
}

async function updateRecord(Model, req, res, fields, label) {
  const changes = pickFields(req.body, fields);

  if (Object.keys(changes).length === 0) {
    return res.status(400).json({
      message: "At least one supported field is required",
    });
  }

  try {
    const record = await Model.findByIdAndUpdate(req.params.id, changes, {
      new: true,
      runValidators: true,
    });

    if (!record) {
      return res.status(404).json({
        message: `${label} not found`,
      });
    }

    return res.json(record);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: `Invalid ${label.toLowerCase()} ID`,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(`${label} could not be updated:`, error.message);
    return res.status(500).json({
      message: `Unable to update ${label.toLowerCase()}`,
    });
  }
}

async function deleteRecord(Model, req, res, label) {
  try {
    const record = await Model.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: `${label} not found`,
      });
    }

    return res.json({
      message: `${label} deleted successfully`,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: `Invalid ${label.toLowerCase()} ID`,
      });
    }

    console.error(`${label} could not be deleted:`, error.message);
    return res.status(500).json({
      message: `Unable to delete ${label.toLowerCase()}`,
    });
  }
}

export async function getFaculty(req, res) {
  try {
    const faculty = await Faculty.find({ published: true })
      .select("name position department qualification bio image")
      .sort({ name: 1 });

    return res.json(faculty);
  } catch (error) {
    console.error("Faculty could not be retrieved:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve faculty",
    });
  }
}

export function createFaculty(req, res) {
  return createRecord(
    Faculty,
    req,
    res,
    ["name", "position", "department", "qualification", "bio", "image", "published"],
    "Faculty profile"
  );
}

export function updateFaculty(req, res) {
  return updateRecord(
    Faculty,
    req,
    res,
    ["name", "position", "department", "qualification", "bio", "image", "published"],
    "Faculty profile"
  );
}

export function deleteFaculty(req, res) {
  return deleteRecord(Faculty, req, res, "Faculty profile");
}

export async function getNotices(req, res) {
  try {
    const notices = await Notice.find({ published: true })
      .select("title category description publishedAt attachmentUrl")
      .sort({ publishedAt: -1 });

    return res.json(notices);
  } catch (error) {
    console.error("Notices could not be retrieved:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve notices",
    });
  }
}

export function createNotice(req, res) {
  return createRecord(
    Notice,
    req,
    res,
    ["title", "category", "description", "publishedAt", "attachmentUrl", "published"],
    "Notice"
  );
}

export function updateNotice(req, res) {
  return updateRecord(
    Notice,
    req,
    res,
    ["title", "category", "description", "publishedAt", "attachmentUrl", "published"],
    "Notice"
  );
}

export function deleteNotice(req, res) {
  return deleteRecord(Notice, req, res, "Notice");
}
