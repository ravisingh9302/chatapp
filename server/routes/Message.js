const { saveMessage, getMessages,updateMessageOnLogin,updateMessageOnChat,deleteMessage} = require("../cotrollers/messageController");
const {getLastseen} = require("../cotrollers/LastseenController");
const router = require("express").Router();

router.post("/savemsg/", saveMessage);
router.post("/getmsg/", getMessages);
router.post("/updatemsgonlogin/", updateMessageOnLogin);
router.post("/updatemsgonchat/", updateMessageOnChat);
router.post("/deletemsg/", deleteMessage);
router.post("/getlastactive/",getLastseen);

module.exports = router;
