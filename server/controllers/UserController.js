const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  console.log("login controler ",req.body)
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        result: null,
        msg: "User not Resistered"
      })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        result: null,
        msg: "Wrong Password"
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User login Successfully",
      result: user
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

module.exports.register = async (req, res) => {
  console.log("user Resister api called ")
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({
        success: false,
        msg: "User name already exist",
        result: null
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        msg: "Email already Resistered",
        result: null
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatarImage:`https://api.dicebear.com/7.x/micah/svg?radius=50&seed=${username}`
    });
    // delete user.password;
    return res.status(200).json({
      success: true,
      msg: "User Resister Successfully",
      result: null
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  console.log("get all user api requested")
  console.log( "requested by - ",req.params)
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.status(200).json({
      success: true,
      msg: "Users fetched Successfully",
      result: users
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      result: { error: String(e) }
    });
  }
};

module.exports.setAvatar = async (req, res, next) => {
  console.log("set avatar controller called")
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  console.log("logout controller called ")
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
