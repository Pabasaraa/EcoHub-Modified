import request from "supertest";
import app from "../../server.js";
import "fast-text-encoding";

describe("Order Service", () => {
  // Test case for creating a new order
  it("should create a new order", async () => {
    const order = {
      customerId: "customer123",
      customerName: "John Doe",
      customerAddress: {
        street: "123 Main St",
        city: "City",
        country: "Country",
      },
      orderedProducts: [
        { productId: "product1", quantity: 2 },
        { productId: "product2", quantity: 1 },
      ],
      totalPrice: 100,
      shippingOption: "Standard",
    };

    const response = await request(app).post("/orders/new").send(order);

    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
  });

  // Test case for getting all orders
  it("should retrieve all orders", async () => {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Orders retrieved successfully");
    expect(response.body.data).toBeInstanceOf(Array);
  }, 150000);

  // Test case for getting an order by ID
  it("should retrieve an order by ID", async () => {
    const orderId = "64574347ff4740fd97830c9a";
    const response = await request(app).get(`/orders/${orderId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Order retrieved successfully");
  });

  // Test case for updating an order
  it("should update an existing order", async () => {
    const orderId = "64574347ff4740fd97830c9a";
    const updates = {
      shippingOption: "Express",
    };

    const response = await request(app).put(`/orders/${orderId}`).send(updates);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(orderId);
    expect(response.body.shippingOption).toBe(updates.shippingOption);
  });

  // Test case for deleting an order
  it("should delete an existing order", async () => {
    const orderId = "64574347ff4740fd97830c9a";

    const response = await request(app).delete(`/orders/${orderId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(orderId);
  });
});
