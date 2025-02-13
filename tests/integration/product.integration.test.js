const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const Product = require("../../models/product.model");

jest.setTimeout(60000);

describe("Product API integration Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodejscluster-project.dus5d.mongodb.net/?retryWrites=true&w=majority&appName=nodejscluster-project",
    );
    await Product.deleteMany({});
    const count = await Product.countDocuments();
    console.log(`Documents in collection: ${count}`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should fetch an empty product list", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("should handle invalid product id gracefully", async () => {
    const invalidId = "invalidId";
    const res = await request(app).get(`/api/products/${invalidId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Invalid Product ID");
  });

  it("should add and fetch a product", async () => {
    const product = { name: "pizza", quantity: 10, price: 4.99 };
    const addRes = await request(app).post("/api/products").send(product);
    expect(addRes.status).toBe(201);

    const fetchRes = await request(app).get(`/api/products/${addRes.body._id}`);
    expect(fetchRes.status).toBe(200);
    expect(fetchRes.body.name).toBe("pizza");
  });

  it("should handle update for nonexistent product", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const updateRes = await request(app)
      .put(`/api/products/${nonExistentId}`)
      .send({ name: "Updated Product" });
    expect(updateRes.status).toBe(404);
    expect(updateRes.body.message).toBe("Product not found");
  });

  it("should handle delete for nonexistent product", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const deleteRes = await request(app).delete(
      `/api/products/${nonExistentId}`,
    );
    expect(deleteRes.status).toBe(404);
    expect(deleteRes.body.message).toBe("Product not found");
  });
});
