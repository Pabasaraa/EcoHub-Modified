import axios from "axios";
import articleService from "../services/article.service.js";
import searchItems from "../services/search.service.js";
import ArticleValidation from "../services/validation.service.js";

const createArticle = async (req, res) => {
  try {
    // Uncomment this code when the authentication service is ready

    // if (!req.body.token) {
    //   throw new Error("No token provided!");
    // }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/users/validatetoken",
    //     {},
    //     {
    //       headers: {
    //         "x-access-token": req.body.token,
    //       },
    //     }
    //   );

    //   req.body.role = response.data.data.role;
    //   req.body.adminId = response.data.data._id;
    // } catch (error) {
    //   throw new Error("Error while getting the user ID: " + error);
    // }

    if (req.body.role !== "admin") {
      throw new Error("You are not authorized to add article!");
    }

    const item = new ArticleValidation(req);

    // Validate the request body
    await item.validate();

    const newItem = await articleService.createArticle(item);

    res.status(200).json({
      status: "success",
      message: "Article added successfully!",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getArticles = async (req, res) => {
  try {
    const items = await articleService.getArticles();

    res.status(200).json({
      status: "success",
      message: "Articles fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getArticleByAdminId = async (req, res) => {
  const token = req.headers["x-access-token"];
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
        }
      );
      adminId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const items = await articleService.getArticleByAdminId(adminId);

    res.status(200).json({
      status: "success",
      message: "Articles fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getArticlesById = async (req, res) => {
  try {
    const item = await articleService.getArticlesById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Article fetched successfully!",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const searchArticlesByTerm = async (req, res) => {
  try {
    const items = await searchItems(req.body.searchTerm);

    res.status(200).json({
      status: "success",
      message: "Articles fetched successfully!",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateArticleById = async (req, res) => {
  try {
    // Uncomment this code when the authentication service is ready

    // if (!req.body.token) {
    //   throw new Error("No token provided!");
    // }
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/users/validatetoken",
    //     {},
    //     {
    //       headers: {
    //         "x-access-token": req.body.token,
    //       },
    //     }
    //   );
    //   req.body.userId = response.data.data._id;
    // } catch (error) {
    //   throw new Error("Error while getting the user ID: " + error);
    // }

    if (req.body.role !== "admin") {
      throw new Error("You are not authorized to update articles!");
    }

    const item = new ArticleValidation(req);
    const updatedItem = await articleService.updateArticleById(
      req.params.id,
      item
    );

    res.status(200).json({
      status: "success",
      message: "Articled updated successfully!",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    await articleService.deleteArticleById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Article deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createArticle,
  getArticles,
  getArticleByAdminId,
  getArticlesById,
  searchArticlesByTerm,
  updateArticleById,
  deleteArticleById,
};
