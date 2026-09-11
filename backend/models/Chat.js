const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
      trim: true,
    },

    botReply: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat =
  mongoose.models.Chat ||
  mongoose.model("Chat", chatSchema);

module.exports = Chat;