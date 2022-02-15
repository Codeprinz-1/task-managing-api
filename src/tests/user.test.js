const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { user1, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "testname2",
      email: "testemail2@gmail.com",
      password: "testpass2",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "testname2",
      email: "testemail2@gmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("testpass2");
});

test("Should login existing usesr", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: user1.email,
      password: user1.password,
    })
    .expect(200);

  const user = await User.findById(user1._id);

  expect(user.tokens[1].token).toBe(response.body.token);
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

test("Should delete account for authenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(user1._id);

  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .attach("avatar", `${__dirname}/fixtures/profile.png`)
    .expect(200);

  const user = await User.findById(user1._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      name: "changedtestname1",
    })
    .expect(200);

  const user = await User.findById(user1._id);

  expect(user.name).toEqual("changedtestname1");
});

test("Should not update invalid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({ location: "abuja" })
    .expect(400);
});
