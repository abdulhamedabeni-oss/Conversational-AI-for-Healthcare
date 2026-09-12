const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Healthcare AI Backend is running successfully!",
  });
});

// Contact API
app.use("/api/contact", contactRoutes);

// Hospital API
app.use("/api/hospital", hospitalRoutes);

// Services API
app.use("/api/services", serviceRoutes);

// Departments API
app.use("/api/departments", departmentRoutes);

// Chatbot API
app.use("/api/chat", chatRoutes);

// Doctors API
app.use("/api/doctors", doctorRoutes);

// Appointments API
app.use("/api/appointments", appointmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});