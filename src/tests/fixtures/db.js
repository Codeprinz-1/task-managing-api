const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../models/task");
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

const task1 = {
  description: "initial task",
  completed: true,
  owner: user1._id,
};

const task2 = {
  description: "second task",
  completed: true,
  owner: user3._id,
};

const task3 = {
  description: "third task",
  owner: user3._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(user1).save();
  await new User(user3).save();
  await new Task(task1).save();
  await new Task(task2).save();
  await new Task(task3).save();
};

module.exports = {
  user1,
  setUpDatabase,
};
