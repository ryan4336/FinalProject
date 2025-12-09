require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ===== MONGO CONNECTION =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== MODELS =====
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true }
});

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  priority: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

// ======================================
// =============== USERS =================
// ======================================

// GET users OR user by email
app.get("/api/users", async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const found = await User.findOne({ email });
      return res.json(found ? [found] : []); // match frontend expectations
    }

    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.json(existing);

    const newUser = new User({ name, email });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================
// =============== TASKS =================
// ======================================

// GET tasks for a specific user
app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (err) {
    console.error("Task fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single task (needed for EditTask.js)
app.get("/api/tasks/id/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("Get task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
