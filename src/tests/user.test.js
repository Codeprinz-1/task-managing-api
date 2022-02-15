const request = require("supertest");
const app = require("../app");
const User - require('../models/user')

beforeEach(() => {

})

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "andrew",
      email: "testemail@gmail.com",
      password: "my favourite",
    })
    .expect(201);
});
