const express = require("express");
const router = express.Router();
const { getUsers, getMembers, updateMe, createUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

router.use(protect);
router.get("/members", getMembers);
router.put("/me", updateMe);
router.get("/", adminOnly, getUsers);
router.post("/", adminOnly, createUser);

module.exports = router;
