import articleModel from "../models/article.model.js";

async function createArticle(article) {
  try {
    const newArticle = new articleModel(article);
    return await newArticle.save();
  } catch (error) {
    throw new Error("Error while creating article: " + error);
  }
}

async function getArticles() {
  try {
    return await articleModel.find();
  } catch (error) {
    throw new Error("Error while getting articles: " + error);
  }
}

async function getArticleByAdminId(id) {
  try {
    return await articleModel.find({ adminId: id });
  } catch (error) {
    throw new Error("Error while getting articles by user id: " + error);
  }
}

async function getArticlesById(id) {
  try {
    return await articleModel.findById(id);
  } catch (error) {
    throw new Error("Error while getting articles by id: " + error);
  }
}

async function updateArticleById(id, article) {
  try {
    return await articleModel.findOneAndUpdate({ _id: id }, article);
  } catch (error) {
    throw new Error("Error while updating article by id: " + error);
  }
}

async function deleteArticleById(id) {
  try {
    return await articleModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error while deleting article by id: " + error);
  }
}

export default {
    createArticle,
    getArticles,
    getArticleByAdminId,
    getArticlesById,
    updateArticleById,
    deleteArticleById,
};
