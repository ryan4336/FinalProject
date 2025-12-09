require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------
// Models
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

// GET users OR filter by email
app.get("/api/users", async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const user = await User.findOne({ email });
      return res.json(user ? [user] : []);
    }

    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new User({ name, email });
    const saved = await user.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------
// TASK ROUTES
// -------------------

// GET tasks (supports frontend call: GET /tasks?userId=###)
app.get("/api/tasks", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single task
app.get("/api/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add task
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
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task
app.delete("/api/tasks/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
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
