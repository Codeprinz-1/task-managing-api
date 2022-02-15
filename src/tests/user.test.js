const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

const user1Id = new mongoose.Types.ObjectId();

const user1 = {
  _id: user1Id,
  name: "testname1",
  email: "testemail1@gmail.com",
  password: "testpass1",
  tokens: [{ token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET) }],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(user1).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "testname2",
      email: "testemail2@gmail.com",
      password: "testpass2",
    })
    .expect(201);
});

test("Should login existing usesr", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: user1.email,
      password: user1.password,
    })
    .expect(200);
});

test("Should get profule for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile of unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});
