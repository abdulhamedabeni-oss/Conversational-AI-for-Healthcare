const express = require("express");
const HospitalInfo = require("../models/HospitalInfo");
const Service = require("../models/Service");
const Department = require("../models/Department");
const Chat = require("../models/Chat");

const router = express.Router();

// Helper function
const includesAny = (message, keywords) => {
  return keywords.some((keyword) => message.includes(keyword));
};

// Get chat history
router.get("/history", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);

    res.status(500).json({
      message: "Something went wrong while fetching chat history.",
    });
  }
});

// Chatbot API
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a question.",
      });
    }

    const hospitalInfo = await HospitalInfo.findOne();
    const services = await Service.find();
    const departments = await Department.find();

    if (!hospitalInfo) {
      return res.status(404).json({
        message: "Hospital information is not available.",
      });
    }

    const userMessage = message.toLowerCase().trim();

    let reply = "";

    // Greetings
    if (
      includesAny(userMessage, [
        "hello",
        "good morning",
        "good afternoon",
        "good evening",
      ]) ||
      userMessage === "hi" ||
      userMessage === "hey"
    ) {
      reply = `Hello! 👋 Welcome to ${hospitalInfo.name}. How can I assist you today?`;
    }

    // How are you
    else if (
      includesAny(userMessage, [
        "how are you",
        "how do you do",
        "how are things",
      ])
    ) {
      reply =
        "I'm doing great, thank you! 😊 I'm here to help you find information about our hospital, services, departments, contact details, and opening hours.";
    }

    // Who are you
    else if (
      userMessage === "who are you" ||
      userMessage === "who are you?" ||
      userMessage === "what are you" ||
      userMessage === "what are you?"
    ) {
      reply =
        "I am HealthAI, a conversational healthcare information assistant designed to help users access information about hospital services and facilities.";
    }

    // What can you do
    else if (
      includesAny(userMessage, [
        "what can you do",
        "how can you help",
        "what can i ask",
        "what do you know",
      ]) ||
      userMessage === "help me"
    ) {
      reply =
        "I can provide information about hospital services, departments, emergency care, pharmacy, laboratory services, contact details, location, and opening hours.";
    }

    // Opening hours
    else if (
      includesAny(userMessage, [
        "opening hours",
        "opening time",
        "closing time",
        "what time do you open",
        "what time do you close",
        "when do you open",
        "when do you close",
        "are you open",
      ])
    ) {
      reply = `Our opening hours are: ${hospitalInfo.openingHours}.`;
    }

    // Location
    else if (
      includesAny(userMessage, [
        "location",
        "address",
        "where are you located",
        "where is the hospital",
        "where can i find the hospital",
        "where are you",
      ])
    ) {
      reply = `Our hospital is located at ${hospitalInfo.address}.`;
    }

    // Contact
    else if (
      includesAny(userMessage, [
        "phone",
        "contact",
        "email",
        "call",
        "phone number",
        "contact number",
        "how can i reach you",
      ])
    ) {
      reply = `You can contact us on ${hospitalInfo.phone} or email us at ${hospitalInfo.email}.`;
    }

    // Emergency
    else if (
      includesAny(userMessage, [
        "emergency",
        "urgent",
        "accident",
        "critical condition",
        "serious injury",
      ])
    ) {
      const emergencyService = services.find((service) =>
        service.title.toLowerCase().includes("emergency")
      );

      if (emergencyService) {
        reply = `${emergencyService.title}: ${emergencyService.description}`;
      } else {
        reply =
          "For medical emergencies, please contact the hospital or visit the nearest emergency department immediately.";
      }
    }

    // Laboratory
    else if (
      includesAny(userMessage, [
        "laboratory",
        "lab",
        "lab test",
        "blood test",
        "medical test",
        "diagnostic test",
        "testing",
      ])
    ) {
      const laboratoryService = services.find((service) =>
        service.title.toLowerCase().includes("laboratory")
      );

      if (laboratoryService) {
        reply = `${laboratoryService.title}: ${laboratoryService.description}`;
      } else {
        reply = "Laboratory service information is currently unavailable.";
      }
    }

    // Pharmacy
    else if (
      includesAny(userMessage, [
        "pharmacy",
        "medicine",
        "medication",
        "drug",
        "drugs",
        "prescription",
      ])
    ) {
      const pharmacyService = services.find((service) =>
        service.title.toLowerCase().includes("pharmacy")
      );

      if (pharmacyService) {
        reply = `${pharmacyService.title}: ${pharmacyService.description}`;
      } else {
        reply = "Pharmacy service information is currently unavailable.";
      }
    }

    // Cardiology
    else if (
      includesAny(userMessage, [
        "cardiology",
        "heart doctor",
        "heart specialist",
        "heart problem",
        "heart condition",
        "chest pain",
      ])
    ) {
      const cardiologyDepartment = departments.find((department) =>
        department.name.toLowerCase().includes("cardiology")
      );

      if (cardiologyDepartment) {
        reply = `${cardiologyDepartment.name}: ${cardiologyDepartment.description}`;
      } else {
        reply = "Cardiology department information is currently unavailable.";
      }
    }

    // Pediatrics
else if (
  includesAny(userMessage, [
    "pediatrics",
    "pediatrician",
    "child doctor",
    "children doctor",
    "baby doctor",
    "child health",
    "children health",
    "baby care",
    "my child",
    "my baby",
    "take my child",
    "take my baby",
    "for my child",
    "for my baby",
    "sick child",
    "sick baby",
  ])
) {
  const pediatricsDepartment = departments.find((department) =>
    department.name.toLowerCase().includes("pediatrics")
  );

  if (pediatricsDepartment) {
    reply = `${pediatricsDepartment.name}: ${pediatricsDepartment.description}`;
  } else {
    reply = "Pediatrics department information is currently unavailable.";
  }
}

    // Maternity
    else if (
      includesAny(userMessage, [
        "maternity",
        "pregnancy",
        "pregnant",
        "pregnant woman",
        "antenatal",
        "newborn",
        "delivery",
        "childbirth",
      ])
    ) {
      const maternityDepartment = departments.find((department) =>
        department.name.toLowerCase().includes("maternity")
      );

      if (maternityDepartment) {
        reply = `${maternityDepartment.name}: ${maternityDepartment.description}`;
      } else {
        reply = "Maternity department information is currently unavailable.";
      }
    }

    // General Medicine
    else if (
      includesAny(userMessage, [
        "general medicine",
        "general doctor",
        "general consultation",
        "doctor consultation",
        "see a doctor",
        "consult a doctor",
      ])
    ) {
      const generalMedicine = departments.find((department) =>
        department.name.toLowerCase().includes("general medicine")
      );

      if (generalMedicine) {
        reply = `${generalMedicine.name}: ${generalMedicine.description}`;
      } else {
        reply =
          "General Medicine department information is currently unavailable.";
      }
    }

    // Services
    else if (
      includesAny(userMessage, [
        "service",
        "services",
        "what do you offer",
        "what do you provide",
        "available services",
      ])
    ) {
      reply = `Our healthcare services include: ${services
        .map((service) => service.title)
        .join(", ")}.`;
    }

    // Departments
    else if (
      includesAny(userMessage, [
        "department",
        "departments",
        "available departments",
        "what departments",
      ])
    ) {
      reply = `Our departments include: ${departments
        .map((department) => department.name)
        .join(", ")}.`;
    }

    // About hospital
    else if (
      includesAny(userMessage, [
        "about hospital",
        "about the hospital",
        "tell me about the hospital",
        "hospital information",
      ])
    ) {
      reply = `${hospitalInfo.name} is located at ${hospitalInfo.address}. ${hospitalInfo.tagline}.`;
    }

    // Thank you
    else if (
      includesAny(userMessage, [
        "thank you",
        "thanks",
        "thank",
        "i appreciate",
      ])
    ) {
      reply =
        "You're very welcome! 😊 I'm always here to help with hospital information.";
    }

    // Goodbye
    else if (
      includesAny(userMessage, [
        "goodbye",
        "see you",
        "talk later",
      ]) ||
      userMessage === "bye"
    ) {
      reply =
        "Goodbye! 👋 Thank you for using HealthAI. Stay safe and take care!";
    }

       // Default response
    else {
      reply =
        "I'm sorry, I don't fully understand that question yet. 😊 You can ask me about hospital services, departments, cardiology, pediatrics, maternity, emergency care, laboratory services, pharmacy, location, contact information, or opening hours.";
    }

    // Save conversation to MongoDB
    const newChat = new Chat({
      userMessage: message,
      botReply: reply,
    });

    await newChat.save();

    res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      message: "Something went wrong while processing your question.",
    });
  }
});

module.exports = router;