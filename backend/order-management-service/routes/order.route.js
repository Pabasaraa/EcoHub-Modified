import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/new", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/user/:id", orderController.getOrdersByUserId);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.patch("/:id/verify", orderController.verifyOrder);

export default router;
