const mongoose = require("mongoose");
require("dotenv").config();

const HospitalInfo = require("./models/HospitalInfo");

const hospitalData = {
  name: "HealthAI Medical Center",
  tagline: "Quality Healthcare, Smarter Access",
  phone: "+234 800 000 0000",
  email: "info@healthaimedical.com",
  address: "Nasarawa State, Nigeria",
  openingHours: "Monday - Friday: 8:00 AM - 5:00 PM",
};

const seedHospital = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    // Remove existing hospital information
    await HospitalInfo.deleteMany({});

    // Add hospital information
    await HospitalInfo.create(hospitalData);

    console.log("Hospital information added successfully!");

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error adding hospital information:", error.message);
    process.exit(1);
  }
};

seedHospital();