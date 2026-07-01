const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const { status, author, tag, search, pinned } = req.query;
    const query = {};

    query.$or = [
      { visibility: "public" },
      { author: req.user._id },
    ];

    if (status) query.status = status;
    if (author) query.author = author;
    if (tag) query.tags = tag;
    if (pinned === "true") query.pinned = true;
    if (search) query.$text = { $search: search };

    const projects = await Project.find(query)
      .populate("author", "name username color avatar")
      .sort({ pinned: -1, createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "author", "name username color avatar bio"
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, author: req.user._id });
    await project.populate("author", "name username color avatar");
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    if (project.author.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorised" });

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    }).populate("author", "name username color avatar");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    if (project.author.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorised" });

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
