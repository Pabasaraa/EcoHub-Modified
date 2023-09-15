import productModel from "../models/product.model.js";

async function searchItems(searchTerm) {
  try {
    return await productModel.find({
      $or: [
        { productName: { $regex: searchTerm, $options: "i" } },
        { productDescription: { $regex: searchTerm, $options: "i" } },
      ],
    });
  } catch (error) {
    throw new Error("Error while searching items: " + error);
  }
}

export default searchItems;
