
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    duration: {
      type: String,
      default: "To be confirmed",
    },

    eligibility: {
      type: String,
      default: "To be confirmed",
    },

    fees: {
      type: Number,
      min: 0,
      default: null,
    },

    image: {
      type: String,
      default: "",
    },

    subjects: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
