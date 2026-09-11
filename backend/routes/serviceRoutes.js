const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);

    res.status(500).json({
      message: "Something went wrong while fetching services.",
    });
  }
});

module.exports = router;