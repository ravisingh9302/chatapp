// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const groupMessageSchema =new mongoose.Schema(
//   {
//     groupId:{
//         type:String
//     },
//     message: {
//       text: { type: String },
//     },
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     file: {
//       type: Buffer
//     },
//     status: {
//       type: String,
//       default: "sent",
//       enum: ["sent", "delivered", "seen"]
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("GroupMessages", groupMessageSchema);
