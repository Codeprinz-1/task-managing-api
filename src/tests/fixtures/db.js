const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/user");

const user1Id = new mongoose.Types.ObjectId();

const user1 = {
  _id: user1Id,
  name: "testname1",
  email: "testemail1@gmail.com",
  password: "testpass1",
  tokens: [{ token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET) }],
};

const user3Id = new mongoose.Types.ObjectId();

const user3 = {
  _id: user3Id,
  name: "testname3",
  email: "testemail3@gmail.com",
  password: "testpass3",
  tokens: [{ token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET) }],
};
const setUpDatabase = async () => {
  await User.deleteMany();
  await new User(user1).save();
  await new User(user3).save();
};

module.exports = {
  user1,
  setUpDatabase,
};
