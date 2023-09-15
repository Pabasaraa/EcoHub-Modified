import reviewModel from "../models/review.model.js";

async function createReview(review) {
  try {
    const newReview = new reviewModel(review);
    return await newReview.save();
  } catch (error) {
    throw new Error("Error while creating review" + error);
  }
}

async function getReviewsById(id) {
  try {
    return await reviewModel.find({ postedOn: id });
  } catch (error) {
    throw new Error("Error while getting reviews by id" + error);
  }
}

export default {
  createReview,
  getReviewsById,
};
