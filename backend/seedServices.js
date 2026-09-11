const mongoose = require("mongoose");
require("dotenv").config();

const Service = require("./models/Service");

const services = [
  {
    title: "General Consultation",
    description:
      "Professional medical consultation and general healthcare support.",
  },
  {
    title: "Emergency Care",
    description:
      "Quick access to emergency healthcare information and support.",
  },
  {
    title: "Laboratory Services",
    description:
      "Information about laboratory tests and diagnostic services.",
  },
  {
    title: "Pharmacy",
    description:
      "Information about medication and pharmacy services.",
  },
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    // Remove old services to prevent duplicates
    await Service.deleteMany({});

    // Add services
    await Service.insertMany(services);

    console.log("Services added successfully!");

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error adding services:", error.message);
    process.exit(1);
  }
};

seedServices();