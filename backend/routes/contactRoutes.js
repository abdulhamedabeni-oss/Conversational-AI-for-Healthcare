const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Submit a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check that all fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please provide your name, email, and message.",
      });
    }

    // Create a new contact message
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save message to MongoDB
    await newContact.save();

    res.status(201).json({
      message: "Your message has been submitted successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);

    res.status(500).json({
      message: "Something went wrong while submitting your message.",
    });
  }
});

module.exports = router;