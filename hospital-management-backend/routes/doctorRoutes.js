const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

console.log("DOCTOR ROUTES LOADED");

// Test Route
router.put("/test", (req, res) => {
  console.log("TEST PUT WORKING");
  res.json({ message: "PUT works" });
});

// ================= GET ALL DOCTORS =================

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET SINGLE DOCTOR =================

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= ADD DOCTOR =================

router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor({
      name: req.body.name,
      specialization: req.body.specialization,
      phone: req.body.phone,
      email: req.body.email,
      experience: req.body.experience,
      availability: req.body.availability,
    });

    const savedDoctor = await doctor.save();

    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ================= UPDATE DOCTOR =================

router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        specialization: req.body.specialization,
        phone: req.body.phone,
        email: req.body.email,
        experience: req.body.experience,
        availability: req.body.availability,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ================= DELETE DOCTOR =================

router.delete("/:id", async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!deletedDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;