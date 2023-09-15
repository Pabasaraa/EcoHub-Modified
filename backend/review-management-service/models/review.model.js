import mongoose from "mongoose";

const reviewScema = new mongoose.Schema({
  postedBy: {
    // Type is mongoose.Schema.Types.ObjectId, but we are using String for now
    type: String,
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
  },
  postedOn: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const reviewModel = mongoose.model("Review", reviewScema);

export default reviewModel;
