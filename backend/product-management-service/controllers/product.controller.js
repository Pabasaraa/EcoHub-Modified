import axios from "axios";
import productService from "../services/product.service.js";
import searchItems from "../services/search.service.js";
import ProductValidation from "../services/validation.service.js";

const createProduct = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      throw new Error("No token provided!");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": token, // Use the token from cookies
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      req.body.role = response.data.data.role;
      req.body.adminId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    if (req.body.role !== "admin") {
      throw new Error("You are not authorized to add products!");
    }

    const item = new ProductValidation(req);

    // Validate the request body
    await item.validate();

    const newItem = await productService.createProduct(item);

    res.status(200).json({
      status: "success",
      message: "Product added successfully!",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const items = await productService.getProducts();

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProductsByAdminId = async (req, res) => {
  const token = req.cookies.token;
  let adminId;
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
      adminId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const items = await productService.getProductsByAdminId(adminId);

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProductsById = async (req, res) => {
  try {
    const item = await productService.getProductsById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully!",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const searchProductsByTerm = async (req, res) => {
  try {
    const items = await searchItems(req.body.searchTerm);

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateProductById = async (req, res) => {
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
      req.body.userId = response.data.data._id;
      req.body.role = response.data.data.role;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    if (req.body.role !== "admin") {
      throw new Error("You are not authorized to update this product!");
    }

    const item = new ProductValidation(req);
    const updateditem = await productService.updateProductById(
      req.params.id,
      item
    );

    res.status(200).json({
      status: "success",
      message: "Product updated successfully!",
      data: updateditem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createProduct,
  getProducts,
  getProductsByAdminId,
  getProductsById,
  searchProductsByTerm,
  updateProductById,
  deleteProductById,
};
