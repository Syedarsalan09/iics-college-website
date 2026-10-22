
import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    image: {
      type: String,
      default: "",
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
