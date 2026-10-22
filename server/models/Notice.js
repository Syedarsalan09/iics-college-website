
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      enum: ["Admissions", "Academic", "Examination", "General"],
      default: "General",
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    attachmentUrl: {
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

export default mongoose.model("Notice", noticeSchema);
