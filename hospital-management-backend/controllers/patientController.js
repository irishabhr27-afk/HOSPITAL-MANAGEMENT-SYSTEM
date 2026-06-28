const Patient = require("../models/Patient");

// ================= GET ALL PATIENTS =================
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE PATIENT =================
const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE PATIENT =================
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PATIENT =================
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PATIENT =================
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};