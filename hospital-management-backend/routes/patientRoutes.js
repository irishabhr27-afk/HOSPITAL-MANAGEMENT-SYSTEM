const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// ================= GET ALL PATIENTS =================

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET PATIENT BY ID =================

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= ADD PATIENT =================

router.post("/", async (req, res) => {
  try {
    const patient = new Patient({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      bloodGroup: req.body.bloodGroup,
    });

    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ================= UPDATE PATIENT =================

router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ================= DELETE PATIENT =================

router.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;