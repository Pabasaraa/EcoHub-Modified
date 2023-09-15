import express from "express";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();

router.route("/new").post(reviewController.createReview);
router.route("/:id").get(reviewController.getReviewsById);

export default router;
