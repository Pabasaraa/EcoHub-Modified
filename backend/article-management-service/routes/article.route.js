import express from "express";
import articleController from "../controllers/article.controller.js";

const router = express.Router();

router.route("/new").post(articleController.createArticle);
router.route("/get/all").get(articleController.getArticles);
router.route("/user/get").get(articleController.getArticleByAdminId);
router.route("/:id").get(articleController.getArticlesById);
router.route("/search").post(articleController.searchArticlesByTerm);
router.route("/delete/:id").delete(articleController.deleteArticleById);
router.route("/update/:id").put(articleController.updateArticleById);

export default router;
