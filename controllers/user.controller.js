const bcryptjs = require("bcryptjs");
const User = require("../models/User");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, password, email, level } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exist");
    }
    const salt = await bcryptjs.genSaltSync(10);
    const hash = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hash,
      name,
      level: level ? level : "customer",
    });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ status: "success", user });
    }
    throw new Error("Invalid token");
  } catch (error) {
    res.status(400).json({status:"fail", error:error.message});
  }
};
module.exports = userController;
