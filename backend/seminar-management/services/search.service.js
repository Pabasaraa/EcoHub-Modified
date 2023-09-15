import seminarModel from "../models/seminar.model.js";

async function searchSeminars(searchTerm) {
  try {
    return await seminarModel.find({
      $or: [
        { seminarDate: { $regex: searchTerm, $options: "i" } },
        { seminarDescription: { $regex: searchTerm, $options: "i" } },
      ],
    });
  } catch (error) {
    throw new Error("Error while searching items: " + error);
  }
}

export default searchSeminars;
