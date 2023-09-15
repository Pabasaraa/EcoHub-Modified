import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImages: [
    {
      type: Buffer,
      required: true,
    },
  ],
  productCategory: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("Products", productSchema);

export default productModel;
