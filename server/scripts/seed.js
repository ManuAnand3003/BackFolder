require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");

const users = [
  { name: "Manu Anand", username: "manu", email: "manu@backfolder.dev", password: "password123", role: "admin", color: "teal", bio: "AI/ML engineer. Building weird things." },
  { name: "Member Two", username: "member2", email: "member2@backfolder.dev", password: "password123", color: "purple", bio: "" },
  { name: "Member Three", username: "member3", email: "member3@backfolder.dev", password: "password123", color: "coral", bio: "" },
  { name: "Member Four", username: "member4", email: "member4@backfolder.dev", password: "password123", color: "blue", bio: "" },
  { name: "Member Five", username: "member5", email: "member5@backfolder.dev", password: "password123", color: "amber", bio: "" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Project.deleteMany({});
  const created = await User.insertMany(users);
  console.log("Users seeded:", created.map(u => u.username));
  const manu = created[0];
  await Project.create([
    { title: "EmoVision", description: "Real-time facial emotion recognition using ONNX ensemble, WebSocket streaming, and continual learning.", author: manu._id, status: "done", tags: ["ml", "fastapi", "onnx"], coverIcon: "FiEye", coverColor: "teal", pinned: true },
    { title: "VisionCaption", description: "Image captioning with BLIP-Large, attention heatmaps, beam and nucleus sampling.", author: manu._id, status: "done", tags: ["ml", "fastapi", "nlp"], coverIcon: "FiImage", coverColor: "teal" },
    { title: "AERIS v2", description: "Local AI companion with four-tier memory, LoRA self-improvement, and OS-level Hyprland integration.", author: manu._id, status: "in-progress", tags: ["llm", "lora", "arch-linux"], coverIcon: "FiCpu", coverColor: "purple", pinned: true },
  ]);
  console.log("Projects seeded.");
  process.exit(0);
}

seed().catch(console.error);
