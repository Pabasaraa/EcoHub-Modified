import articleModel from "../models/article.model.js";

async function searchItems(searchTerm) {
  try {
    return await articleModel.find({
      $or: [
        { articleTitle: { $regex: searchTerm, $options: "i" } },
        { articleAuthor: { $regex: searchTerm, $options: "i" } },
      ],
    });
  } catch (error) {
    throw new Error("Error while searching items: " + error);
  }
}

export default searchItems;
