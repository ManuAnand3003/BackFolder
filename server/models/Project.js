const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverIcon: { type: String, default: "FiBox" },
    coverColor: { type: String, default: "teal" },
    status: {
      type: String,
      enum: ["done", "in-progress", "idea", "planned", "archived"],
      default: "idea",
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    links: {
      github: { type: String, default: "" },
      live: { type: String, default: "" },
      figma: { type: String, default: "" },
    },
    pinned: { type: Boolean, default: false },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
  },
  { timestamps: true }
);

projectSchema.index({ title: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Project", projectSchema);
