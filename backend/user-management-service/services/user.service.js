import userModel from "../models/user.model.js";

async function createUser(user) {
  try {
    const newUser = new userModel(user);
    return await newUser.save();
  } catch (error) {
    throw new Error("Error while creating user: " + error);
  }
}

async function getUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    throw new Error("Error while getting user by id: " + error);
  }
}

async function getUserByUsername(username) {
  try {
    return await userModel.findOne({ username: username });
  } catch (error) {
    throw new Error("Error while getting user by username: " + error);
  }
}

async function checkExistence(email, username) {
  try {
    return await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
  } catch (error) {
    throw new Error("Error while getting user by username: " + error);
  }
}

async function updateUser(id, user) {
  try {
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    throw new Error("Error while updating user: " + error);
  }
}

async function deleteUser(id) {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error while deleting user: " + error);
  }
}

export default {
  createUser,
  getUserById,
  getUserByUsername,
  checkExistence,
  updateUser,
  deleteUser,
};
