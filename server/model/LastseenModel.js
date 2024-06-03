const mongoose = require("mongoose");

const lastseenSchema = mongoose.Schema(
  {
    userId:{
        type:String,
        required:true,
        unique:true
    },
    lastActive:{
        type:Date,
        default:Date.now
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lastseen", lastseenSchema);
