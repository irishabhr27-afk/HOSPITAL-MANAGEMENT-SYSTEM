const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      minlength: [3, "Specialization must be at least 3 characters"],
      maxlength: [50, "Specialization cannot exceed 50 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [60, "Experience seems invalid"],
    },

    availability: {
      type: String,
      enum: {
        values: ["Available", "Busy", "On Leave"],
        message: "Invalid availability status",
      },
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);