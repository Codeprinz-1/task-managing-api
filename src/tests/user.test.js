const request = require("supertest");
const app = require("../app");

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "andrew",
      email: "andrew@mead.com",
      password: "my favourite password",
    })
    .expect(201);
});
