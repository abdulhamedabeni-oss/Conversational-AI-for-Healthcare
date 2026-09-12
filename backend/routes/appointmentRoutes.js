const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const router = express.Router();

// Book an appointment
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
    } = req.body;

    if (
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !doctorId ||
      !appointmentDate ||
      !timeSlot
    ) {
      return res.status(400).json({
        message: "Please fill in all required appointment fields.",
      });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found.",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      timeSlot,
    });

    if (existingAppointment) {
      return res.status(409).json({
        message:
          "This appointment slot has already been booked. Please choose another time.",
      });
    }

    const appointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
      status: "Confirmed",
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment,
    });
  } catch (error) {
    console.error("Appointment booking error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "This appointment slot has already been booked. Please choose another time.",
      });
    }

    res.status(500).json({
      message: "Something went wrong while booking the appointment.",
    });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId", "name department specialization")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);

    res.status(500).json({
      message: "Unable to fetch appointments.",
    });
  }
});

module.exports = router;