import express from "express";
import multer from "multer";
import seminarController from "../controllers/seminar.controller.js";

const router = express.Router();

// Set up multer storage for image upload
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.route("/new").post( seminarController.createSeminar);
router.route("/get/all").get(seminarController.getSeminars);
router.route("/user/get").get(seminarController.getSeminarsByUserId);
router.route("/:id").get(seminarController.getSeminarsById);
router.route("/search").post(seminarController.searchSeminarsByTerm);
router.route("/delete/:id").delete(seminarController.deleteSeminarById);
router
  .route("/update/:id")
  .put( seminarController.updateSeminarById);

export default router;