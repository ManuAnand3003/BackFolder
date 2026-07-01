const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("name username color avatar bio");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allowed = ["name", "bio", "avatar"];
    const updates = {};
    allowed.forEach((k) => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true, runValidators: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, color, role } = req.body;
    const user = await User.create({ name, username, email, password, color, role });
    res.status(201).json({ _id: user._id, name: user.name, username: user.username, email: user.email, color: user.color, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
