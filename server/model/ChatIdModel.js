const mongoose = require("mongoose");
const { Schema } = mongoose;
const chatSchema = new mongoose.Schema({
    chatWith: {
        type: Array
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ChatId", chatSchema)