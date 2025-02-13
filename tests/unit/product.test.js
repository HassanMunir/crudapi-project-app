const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");

jest.setTimeout(60000);

describe("Product API Unit Tests", () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodejscluster-project.dus5d.mongodb.net/?retryWrites=true&w=majority&appName=nodejscluster-project",
    );
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("should fetch all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a product", async () => {
    const product = { name: "pizza", quantity: 10, price: 4.99 };
    const res = await request(app).post("/api/products").send(product);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("pizza");
  });

  it("should return a welcome message on the root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello from Node API Server Updated");
  });
});
