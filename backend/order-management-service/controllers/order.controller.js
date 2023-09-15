import axios from "axios";
import nodemailer from "nodemailer";
import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );

      req.body.customerId = response.data.data._id;
      req.body.customerName = response.data.data.username;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const newOrder = await orderService.createOrder(req.body);

    if (newOrder) {
      // send payment confirmation email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "official.herbalheal@gmail.com",
          pass: "znolucqomuumgpzu",
        },
      });

      const mailOptions = {
        from: "EcoHub co. official.herbalheal@gmail.com",
        to: "pabasara.was@gmail.com",
        subject: "Payment Confirmation",
        html: `
          <p>Dear  ${newOrder.customerName}</p>
          <p>Thank you for your payment of ${newOrder.totalPrice} LKR. This email is to confirm that your payment has been received and processed.</p>
          <p>Thank you for choosing our service.</p>
          <p>Best regards,</p>
          <p>EcoHub co.</p>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
      } catch (error) {
        console.error(error);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);

    if (order) {
      res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        data: order,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await orderService.getOrdersByUserId(userId);

    if (orders) {
      res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        data: orders,
      });
    } else {
      throw new Error("Orders not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, updates);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      const verifiedOrder = await axios.patch(
        `http://localhost:8000/verification-service/verify-order/${orderId}`
      );
      res.status(200).json(verifiedOrder.data);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
