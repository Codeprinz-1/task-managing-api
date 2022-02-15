const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

const user1 = {
  name: "testname1",
  email: "testemail1@gmail.com",
  password: "testpass1",
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
