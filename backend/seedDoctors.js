const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");

const doctors = [
  {
    name: "Dr. Amina Yusuf",
    department: "General Medicine",
    specialization: "General Physician",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    availableTimeSlots: [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
    ],
    isAvailable: true,
  },

  {
    name: "Dr. David Okafor",
    department: "Cardiology",
    specialization: "Cardiologist",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableTimeSlots: [
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
    ],
    isAvailable: true,
  },

  {
    name: "Dr. Grace Bello",
    department: "Pediatrics",
    specialization: "Pediatrician",
    availableDays: ["Tuesday", "Wednesday", "Friday"],
    availableTimeSlots: [
      "09:00 AM",
      "10:30 AM",
      "12:00 PM",
      "02:00 PM",
    ],
    isAvailable: true,
  },

  {
    name: "Dr. Fatima Abdulhameed",
    department: "Maternity",
    specialization: "Obstetrician",
    availableDays: ["Monday", "Thursday", "Friday"],
    availableTimeSlots: [
      "08:30 AM",
      "10:00 AM",
      "11:30 AM",
      "01:00 PM",
    ],
    isAvailable: true,
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    // Remove old doctors to prevent duplicates
    await Doctor.deleteMany({});

    // Add doctors
    await Doctor.insertMany(doctors);

    console.log("Doctors added successfully!");

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error adding doctors:", error.message);
    process.exit(1);
  }
};

seedDoctors();