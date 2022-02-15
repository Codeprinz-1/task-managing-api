const request = require("supertest");
const Task = require("../models/task");
const app = require("../app");
// const User = require("../models/user");
const { user1, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should create task for user ", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      description: "Change the world",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});
