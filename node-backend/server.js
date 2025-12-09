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
  priority: { type: String, enum: ["Low","Normal","High","Critical"], default: "Normal" },
  dueDate: Date
});


const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

// ======================================
// =============== USERS =================
// ======================================

// GET users OR user by email
// Get user by email OR get all users
app.get("/api/users", async (req, res) => {
  try {
    const { email } = req.query;

    // If requesting by email
    if (email) {
      const user = await User.findOne({ email });
      return res.json(user ? [user] : []);
    }

    // Otherwise return all users
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

// ---- Task Routes ----

// Get all tasks for a specific user (using query param)
app.get("/api/tasks", async (req, res) => {
  try {
    const userId = req.query.userId;

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

// Add a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { user, title, description, completed, priority, dueDate } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Missing user field" });
    }

    const task = new Task({
      user,
      title,
      description,
      completed,
      priority,
      dueDate
    });

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

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

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

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
