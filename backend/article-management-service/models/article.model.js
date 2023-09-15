import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleAuthor: {
    type: String,
    required: true,
  },
  articleDescription: {
    type: String,
    required: true,
  },
  articleContent: [
    {
    type: String,
    required: true,
    },
  ],
  dateOfPublication: {
    type: Date,
    required: true,
  },
});

const articleModel = mongoose.model("Articles", articleSchema);

export default articleModel;
