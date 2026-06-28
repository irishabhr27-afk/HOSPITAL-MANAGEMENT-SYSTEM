require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Middleware
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
//app.use(logger);

// ===============================
// Database Connection
// ===============================
connectDB();

// ===============================
// API Routes
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management System API is running",
  });
});

console.log("✅ Auth routes loaded");
app.use("/api/auth", authRoutes); 
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// ===============================
// Error Handling
// ===============================
app.use(notFound);
app.use(errorHandler);

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log(`🚀 Server running on Port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("==================================");
});