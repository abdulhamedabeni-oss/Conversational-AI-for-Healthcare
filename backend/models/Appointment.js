const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    patientPhone: {
      type: String,
      required: true,
      trim: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent double-booking of the same doctor/date/time slot
appointmentSchema.index(
  {
    doctorId: 1,
    appointmentDate: 1,
    timeSlot: 1,
  },
  {
    unique: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;