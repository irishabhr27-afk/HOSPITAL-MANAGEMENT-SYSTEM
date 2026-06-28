const Doctor = require("../models/Doctor");

// ================= GET ALL DOCTORS =================
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE DOCTOR =================
const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE DOCTOR =================
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE DOCTOR =================
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE DOCTOR =================
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};