const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
      max: [120, "Please enter a valid age"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Invalid gender",
      },
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      validate: {
        validator: function (value) {
          return (
            value === "" ||
            /^\S+@\S+\.\S+$/.test(value)
          );
        },
        message: "Please enter a valid email address",
      },
    },

    bloodGroup: {
      type: String,
      trim: true,
      uppercase: true,
      enum: {
        values: [
          "",
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-",
        ],
        message: "Invalid blood group",
      },
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);