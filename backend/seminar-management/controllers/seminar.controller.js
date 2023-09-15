import axios from "axios";
import seminarService from "../services/seminar.service.js";
import searchseminars from "../services/search.service.js";
import seminarValidation from "../services/validation.service.js";

const createSeminar = async (req, res) => {
  const token = req.cookies.token;

  try {
    // Check if the user has logged in if not throw an err
    if (!token) {
      throw new Error("No token provided!");
    }

    // Get the user ID from the token and add it to the request body
    try {
      const response = await axios.post(
        "http://localhost:8000/users/validatetoken",
        {},
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );

      req.body.role = response.data.data.role;
      req.body.userId = response.data.data._id;
      req.body.username = response.data.data.username;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    if (req.body.role !== "admin") {
      throw new Error("You are not authorized to create items!");
    }

    const seminar = new seminarValidation(req);

    // Validate the request body
    await seminar.validate();

    const newSeminar = await seminarService.createSeminar(seminar);

    res.status(200).json({
      status: "success",
      message: "Item created successfully!",
      data: newSeminar,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getSeminars = async (req, res) => {
  try {
    const seminars = await seminarService.getSeminars();

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: seminars,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getSeminarsByUserId = async (req, res) => {
  const token = req.cookies.token;
  let userId;
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
          withCredentials: true,
        }
      );
      userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const seminars = await seminarService.getSeminarsByUserId(userId);

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: seminars,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getSeminarsById = async (req, res) => {
  try {
    const seminar = await seminarService.getSeminarsById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Item fetched successfully!",
      data: seminar,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const searchSeminarsByTerm = async (req, res) => {
  try {
    const seminars = await searchseminars(req.body.searchTerm);

    res.status(200).json({
      status: "success",
      message: "Items fetched successfully!",
      data: seminars,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateSeminarById = async (req, res) => {
  const token = req.cookies.token;
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
          withCredentials: true,
        }
      );
      req.body.userId = response.data.data._id;
    } catch (error) {
      throw new Error("Error while getting the user ID: " + error);
    }

    const seminarNeedsToUpdate = await seminarService.getSeminarsById(
      req.params.id
    );

    // Check if the user is the owner of the item before updating it
    if (seminarNeedsToUpdate.userId !== req.body.userId) {
      throw new Error("You are not the owner of this item!");
    }

    const seminar = new seminarValidation(req);
    const updatedseminar = await seminarService.updateSeminarById(
      req.params.id,
      seminar
    );

    res.status(200).json({
      status: "success",
      message: "Item updated successfully!",
      data: updatedseminar,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteSeminarById = async (req, res) => {
  try {
    await seminarService.deleteSeminarById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createSeminar,
  getSeminars,
  getSeminarsByUserId,
  getSeminarsById,
  searchSeminarsByTerm,
  updateSeminarById,
  deleteSeminarById,
};
