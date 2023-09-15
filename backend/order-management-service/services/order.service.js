import orderModel from "../models/order.model.js";

const createOrder = async (order) => {
  try {
    const newOrder = new orderModel(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error("Error while placinge the order, " + error.message);
  }
};

const getAllOrders = async () => {
  try {
    const orders = await orderModel.find();
    return orders;
  } catch (error) {
    throw new Error("Error while getting all orders, " + error.message);
  }
};

const getOrderById = async (orderId) => {
  try {
    const order = await orderModel.findById(orderId);
    return order;
  } catch (error) {
    throw new Error("Error while getting the order by ID, " + error.message);
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await orderModel.find({ customerId: userId });
    return orders;
  } catch (error) {
    throw new Error(
      "Error while getting the orders by user ID, " + error.message
    );
  }
};

const updateOrder = async (orderId, updates) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, updates, {
      new: true,
    });
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (orderId) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyOrder = async (orderId) => {
  try {
    const order = await orderModel.findById(orderId);
    if (order) {
      order.verified = true;
      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  verifyOrder,
};
