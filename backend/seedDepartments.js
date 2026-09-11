const mongoose = require("mongoose");
require("dotenv").config();

const Department = require("./models/Department");

const departments = [
  {
    name: "General Medicine",
    description:
      "Provides general healthcare services and consultations.",
  },
  {
    name: "Cardiology",
    description:
      "Specialized care for heart-related conditions.",
  },
  {
    name: "Pediatrics",
    description:
      "Healthcare services for infants, children, and teenagers.",
  },
  {
    name: "Maternity",
    description:
      "Healthcare services for pregnant women and newborn babies.",
  },
];

const seedDepartments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    // Remove old departments to prevent duplicates
    await Department.deleteMany({});

    // Add departments
    await Department.insertMany(departments);

    console.log("Departments added successfully!");

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error adding departments:", error.message);
    process.exit(1);
  }
};

seedDepartments();