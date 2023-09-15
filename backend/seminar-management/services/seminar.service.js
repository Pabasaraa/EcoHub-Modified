import seminarModel from "../models/seminar.model.js";

async function createSeminar(item) {
  try {
   
    const newSeminar = new seminarModel(item);
    return await newSeminar.save();
    
  } catch (error) {
    throw new Error("Error while creating item: " + error);
  }
}

async function getSeminars() {
  try {
    return await seminarModel.find();
  } catch (error) {
    throw new Error("Error while getting items: " + error);
  }
}

async function getSeminarsByUserId(id) {
  try {
    return await seminarModel.find({ userId: id });
  } catch (error) {
    throw new Error("Error while getting items by user id: " + error);
  }
}

async function getSeminarsById(id) {
  try {
    return await seminarModel.findById(id);
  } catch (error) {
    throw new Error("Error while getting items by id: " + error);
  }
}

async function updateSeminarById(id, seminar) {
  try {
    return await seminarModel.findOneAndUpdate({ _id: id }, seminar);
  } catch (error) {
    throw new Error("Error while updating item by id: " + error);
  }
}

async function deleteSeminarById(id) {
  try {
    return await seminarModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error while deleting item by id: " + error);
  }
}

export default {
  createSeminar,
  getSeminars,
  getSeminarsByUserId,
  getSeminarsById,
  updateSeminarById,
  deleteSeminarById,
};
