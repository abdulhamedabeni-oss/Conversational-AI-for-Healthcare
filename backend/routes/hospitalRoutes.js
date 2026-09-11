const express = require("express");
const HospitalInfo = require("../models/HospitalInfo");

const router = express.Router();

// Get hospital information
router.get("/", async (req, res) => {
  try {
    const hospital = await HospitalInfo.findOne();

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital information not found.",
      });
    }

    res.status(200).json(hospital);
  } catch (error) {
    console.error("Error fetching hospital information:", error);

    res.status(500).json({
      message: "Something went wrong while fetching hospital information.",
    });
  }
});

module.exports = router;