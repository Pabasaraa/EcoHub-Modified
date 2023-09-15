import axios from "axios";
import reviewService from "../services/review.service.js";
import reviewValidation from "../services/validation.service.js";

const createReview = async (req, res) => {
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

      req.body.postedBy = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }
    req.body.postedBy = 123;
    const review = new reviewValidation(req.body);
    await review.validate();

    const newReview = await reviewService.createReview(review.getReview());

    res.status(200).json({
      status: "success",
      message: "Review created successfully!",
      data: newReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getReviewsById = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Reviews fetched successfully!",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createReview,
  getReviewsById,
};
