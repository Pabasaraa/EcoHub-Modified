import express from "express";
import multer from "multer";
import productController from "../controllers/product.controller.js";

const router = express.Router();

// Set up multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/new")
  .post(upload.array("images"), productController.createProduct);
router.route("/get/all").get(productController.getProducts);
router.route("/user/get").get(productController.getProductsByAdminId);
router.route("/:id").get(productController.getProductsById);
router.route("/search").post(productController.searchProductsByTerm);
router.route("/delete/:id").delete(productController.deleteProductById);
router
  .route("/update/:id")
  .put(upload.array("images"), productController.updateProductById);

export default router;
