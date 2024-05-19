const User = require("../models/User");
const Note = require("../models/Note");
// we can catch errors without using the try catch block
const asynHandler = require("express-async-handler");
// we use this to encrypt the user password
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//=================================GET ALL USERS==================================
// @desc Get all users
// @route /users
// @method GET
// @access Private
const getAllUsers = asynHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

//=================================CREATE A USER==================================

// @desc Create a user
// @route /users
// @method POST
// @access Private
const createNewUser = asynHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPwd, roles };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data recieved" });
  }
});

//=================================UPDATE A USERS==================================

// @desc Update a user
// @route /users
// @method PATCH
// @access Private
const updateUser = asynHandler(async (req, res) => {
  const { _id, username, roles, active, password } = req.body;

  // Confirm data
  if (
    !_id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid mongoose user ID" });
  }
  const user = await User.findById(_id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== _id) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

//=================================DELETE A USERS==================================

// @desc Delete a user
// @route /users
// @method DELETE
// @access Private
const deleteUser = asynHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    res.status(400).json({ message: "User ID Required" });
  }
  const notes = await Note.findOne({ user: _id }).lean().exec();

  if (notes?.length) {
    return res.status(400).json({ message: "User has a assigned notes" });
  }

  const user = await User.findById(_id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
