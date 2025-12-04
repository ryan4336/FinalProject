require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // allow React frontend to call this API
app.use(express.json()); // parse JSON bodies

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI; // from .env

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple Mongoose schema/model (example: students)
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  major: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students); // this is what Axios will receive
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Example route: add a student
app.post("/api/students", async (req, res) => {
  try {
    const { name, email, major } = req.body;
    const student = new Student({ name, email, major });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({ message: "Server error" }); 
  }
});

//start server test
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
