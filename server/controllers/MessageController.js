const MessagesModel = require("../model/MessageModel");
const ChatIdModel = require("../model/ChatIdModel");

// GET MSG API CONTROL
module.exports.getMessages = async (req, res) => {
  console.log("get message api called", req.body)
  try {
    const { requester, whom, chatId } = req.body;
    if (requester && whom || chatId) {
      if (!chatId) {
        let chatid = await ChatIdModel.findOne({
          chatWith: { $all: [requester, whom] }
        })
        if (!chatid) {
          const data = await ChatIdModel.create({
            chatWith: [requester, whom]
          });
          chatid = data
        }


        const messages = await MessagesModel.find({ chatId: chatid?._id }).sort({ createdAt: 1 });

        return res.status(200).json({
          success: true,
          msg: "messages fatched",
          result: [messages, chatid?._id]
        });
      }
      else {
        const messages = await MessagesModel.find({ chatId }).sort({ createdAt: 1 });

        return res.status(200).json({
          success: true,
          msg: "messages fatched",
          result: [messages, chatId]
        });
      }

      // const projectedMessages = messages.map((msg) => {
      //   return {
      //     fromSelf: msg.sender.toString() === from,
      //     message: msg.message.text,
      //   };
      // });
    }
    else {
      return res.status(400).json({
        success: false,
        msg: "Bad request Data is missing",
        result: []
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

// SAVE MSG API CONTROL
module.exports.saveMessage = async (req, res,) => {
  console.log("save api control ", req.body)
  try {
    const { to, from, msg, status, createdAt, chatId } = req.body;
    const data = await MessagesModel.create({
      chatId: chatId,
      message: msg,
      recieverId: to,
      senderId: from,
      status: status
    });

    if (data) {
      return res.status(200).json({
        success: true,
        msg: "massage save to db",
        result: data
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

// SAVE MSG FROM SERVER
module.exports.saveMsg = async (data) => {
  try {
    console.log("save MSG in db ", data)
    const respon = await MessagesModel.create({
      chatId: data?.chatId,
      message: data?.msg,
      recieverId: data?.to,
      senderId: data?.from,
      status: data?.status
    });

    console.log("msg DB response", respon?._id)
    return respon?.id
  } catch (e) {
    console.log(e)

  }
}
// UPDATE MSG API CONTROL
module.exports.updateMessageOnLogin = async (req, res) => {
  console.log("UPDATE MSG ON LOGIN CONTROLLER", req.body)
  try {
    const { reciever } = req.body;

    if (!reciever) {
      return res.status(400).json({
        success: false,
        msg: "Bad request Data is missing",
        result: []
      });
    }
    const data = await MessagesModel.updateMany({ recieverId: reciever, status: "sent" }, { status: "delivered" });

    console.log("update on Login response ", data)
    if (data) {
      return res.status(200).json({
        success: true,
        msg: "update msg on login succesfully",
        result: data
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};
// UPDATE MSG ON CHAT CONTROL
module.exports.updateMessageOnChat = async (req, res) => {
  console.log("UPDATE ON CHAT CONTROL", req.body)
  try {
    const { chatid, reciever, all } = req.body;
    if (!chatid || !reciever) {
      return res.status(400).json({
        success: false,
        msg: "Bad request Data is missing",
        result: []
      });
    }
    if (!all) {
      const data = await MessagesModel.findOneAndUpdate({ chatId: chatid, recieverId: reciever }, { status: "seen" },{new:true}).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        msg: "one message updata successfuly ",
        result: data
      });
    } else {
      const data1 = await MessagesModel.updateMany({ chatId: chatid, recieverId: reciever }, { status: "seen" });
      return res.status(200).json({
        success: true,
        msg: "many message update successfuly",
        result: data1
      });
    }

  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

// DELETE MSG API CONTROL
module.exports.deleteMessage = async (req, res,) => {
  console.log("DELETE MSG API CONTROLLER", req.body)
  try {
    const { from, to, message } = req.body;
    console.log(req.body)
    const data = await MessagesModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.status(200).json({
        success: false,
        msg: "massage added to db",
        result: data
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

