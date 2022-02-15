const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

const user! = {name: "testname1", email: 'testemail1@gmail.com', password: 'test1'}

beforeEach(() => {
  await User.deleteMany();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "testname2",
      email: "testemail2@gmail.com",
      password: "test2",
    })
    .expect(201);
});
