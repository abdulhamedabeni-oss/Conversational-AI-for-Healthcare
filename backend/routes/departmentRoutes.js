const express = require("express");
const Department = require("../models/Department");

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);

    res.status(500).json({
      message: "Something went wrong while fetching departments.",
    });
  }
});

module.exports = router;