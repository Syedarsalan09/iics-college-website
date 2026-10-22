
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

function createToken(adminId) {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.json({
      message: "Login successful",
      token: createToken(admin._id.toString()),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to log in",
    });
  }
}

export async function getAdminProfile(req, res) {
  res.json({
    admin: req.admin,
  });
}
