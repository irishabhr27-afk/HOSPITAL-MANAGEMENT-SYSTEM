const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: [3, "Patient name must be at least 3 characters"],
      maxlength: [50, "Patient name cannot exceed 50 characters"],
    },

    doctorName: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
      minlength: [3, "Doctor name must be at least 3 characters"],
      maxlength: [50, "Doctor name cannot exceed 50 characters"],
    },

    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },

    status: {
      type: String,
      enum: {
        values: ["Pending", "Confirmed", "Completed", "Cancelled"],
        message: "Invalid appointment status",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);