import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: Object,
    required: true,
  },
  orderedProducts: {
    type: [Object],
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  shippingOption: {
    type: String,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
