const Appointment = require("../models/Appointment");

// ================= GET ALL APPOINTMENTS =================
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE APPOINTMENT =================
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE APPOINTMENT =================
const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE APPOINTMENT =================
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
     {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE APPOINTMENT =================
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};