const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);

    res.status(500).json({
      message: "Something went wrong while fetching doctors.",
    });
  }
});

// Get only available doctors
router.get("/available", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      isAvailable: true,
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching available doctors:", error);

    res.status(500).json({
      message: "Unable to fetch available doctors.",
    });
  }
});

// Get a single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found.",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);

    res.status(500).json({
      message: "Unable to fetch doctor information.",
    });
  }
});

module.exports = router;