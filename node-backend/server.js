require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------
// Schemas / Models
// -------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

// -------------------
// USER ROUTES
// -------------------

// Get user by email (needed for login)
app.get("/api/users/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user ? [user] : []);
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email });
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------
// TASK ROUTES
// -------------------

// Get all tasks for a user
app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update task
app.put("/api/tasks/:taskId", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task
app.delete("/api/tasks/:taskId", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskId);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------
// Start Server
// -------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
