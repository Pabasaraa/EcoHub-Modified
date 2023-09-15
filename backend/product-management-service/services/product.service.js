import productModel from "../models/product.model.js";

async function createProduct(item) {
  try {
    const newItem = new productModel(item);
    return await newItem.save();
  } catch (error) {
    throw new Error("Error while creating item: " + error);
  }
}

async function getProducts() {
  try {
    return await productModel.find();
  } catch (error) {
    throw new Error("Error while getting items: " + error);
  }
}

async function getProductsByAdminId(id) {
  try {
    return await productModel.find({ adminId: id });
  } catch (error) {
    throw new Error("Error while getting items by user id: " + error);
  }
}

async function getProductsById(id) {
  try {
    return await productModel.findById(id);
  } catch (error) {
    throw new Error("Error while getting items by id: " + error);
  }
}

async function updateProductById(id, item) {
  try {
    return await productModel.findOneAndUpdate({ _id: id }, item);
  } catch (error) {
    throw new Error("Error while updating item by id: " + error);
  }
}

async function deleteProductById(id) {
  try {
    return await productModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error while deleting item by id: " + error);
  }
}

export default {
  createProduct,
  getProducts,
  getProductsByAdminId,
  getProductsById,
  updateProductById,
  deleteProductById,
};
