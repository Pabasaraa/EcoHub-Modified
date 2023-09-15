import request from "supertest";
import app from "../../server.js";
import "fast-text-encoding";

describe("Product Management Service", () => {
  // Test case for getting all products
  it("should get all products", async () => {
    const response = await request(app).get("/products/get/all");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Products fetched successfully!");
    expect(response.body.data).toBeInstanceOf(Array);
  }, 150000);

  // Test case for getting a product by ID
  it("should get a product by ID", async () => {
    const productId = "645735ecff4740fd97830c15";
    const response = await request(app).get(`/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Product fetched successfully!");
  });

  // Test case for searching products by term
  it("should search products by term", async () => {
    const response = await request(app)
      .post("/products/search")
      .send({ searchTerm: "a" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Products fetched successfully!");
    expect(response.body.data).toBeInstanceOf(Array);
  }, 150000);

  // Test case for deleting a product by ID
  it("should delete a product by ID", async () => {
    const productId = "645735ecff4740fd97830c15";
    const response = await request(app)
      .delete(`/products/delete/${productId}`)
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU3MDRlOWZlYWZkMTJlMDY3NzY3NDIiLCJ1c2VybmFtZSI6InBhYmFzYXJhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0ODM4NDMwLCJleHAiOjE2ODQ5MjQ4MzB9.-_SIjVHKFkkpdfMhVyz2rq-6itHhSeUM9dnSI8vVueg"
      );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Product deleted successfully!");
  });

  // Test case for creating a new product
  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products/new")
      .send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU3MDRlOWZlYWZkMTJlMDY3NzY3NDIiLCJ1c2VybmFtZSI6InBhYmFzYXJhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0ODQ0NDQ0LCJleHAiOjE2ODQ5MzA4NDR9.o9J4b9pVxZ-GNrscaPK55fCVbO4QsP9AzPYxws-oA-A",
        productName: "Test Product",
        productDescription: "This is a test product",
        productPrice: 9.99,
        images: [
          // Array of product image buffers
          Buffer.from("image data 1"),
          Buffer.from("image data 2"),
        ],
        productCategory: "Test Category",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toContain("Error while getting the user ID:");
  });

  // Test case for getting products by admin ID
  it("should get products by admin ID", async () => {
    const response = await request(app)
      .get("/products/user/get")
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU3MDRlOWZlYWZkMTJlMDY3NzY3NDIiLCJ1c2VybmFtZSI6InBhYmFzYXJhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0ODM4NDMwLCJleHAiOjE2ODQ5MjQ4MzB9.-_SIjVHKFkkpdfMhVyz2rq-6itHhSeUM9dnSI8vVueg"
      );

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toContain("Error while getting the user ID:");
  });

  // Test case for updating a product by ID
  it("should update a product by ID", async () => {
    const productId = "645735ecff4740fd97830c15";
    const response = await request(app)
      .put(`/products/update/${productId}`)
      .send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU3MDRlOWZlYWZkMTJlMDY3NzY3NDIiLCJ1c2VybmFtZSI6InBhYmFzYXJhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0ODM4NDMwLCJleHAiOjE2ODQ5MjQ4MzB9.-_SIjVHKFkkpdfMhVyz2rq-6itHhSeUM9dnSI8vVueg",
      })
      .send({
        productName: "Updated Product",
        productDescription: "This is an updated product",
        productPrice: 19.99,
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toContain("Error while getting the user ID:");
  });
});
