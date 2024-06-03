const mongoose = require("mongoose");
const {Schema} =mongoose
const messageSchema =new mongoose.Schema(
  {
    
    message: {
      type: String,
    },
    chatId:{
      type: Schema.Types.ObjectId,
      ref: "ChatId"
    },
    recieverId: {
      type: String,
    },
    senderId: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer
    },
    status: {
      type: String,
      default: "sent",
      enum: ["sent", "delivered", "seen"]
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
