import axios from "axios";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import userService from "../services/user.service.js";
import userValidation from "../services/validation.service.js";
import jwtValidate from "../services/authorization.service.js";

const createUser = async (req, res) => {
  const user = new userValidation(req.body);

  try {
    await user.validate();
    await user.hashPassword();

    const exists = await userService.checkExistence(user.email, user.username);

    if (exists) {
      throw new Error("User already exists!");
    }

    const newUser = await userService.createUser(user);

    res.status(200).json({
      status: "success",
      message: "Registration successful!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await userService.getUserByUsername(username);

    if (!user) {
      throw new Error("User does not exist!");
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      throw new Error("Invalid password!");
    }

    const csrf = crypto.randomUUID();

    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role, csrf: csrf },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );

    // Using cookies instead of localStorage
    res
      .cookie("token", token, {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .status(200) // Set the HTTP status code to 200 (OK)
      .json({
        // Send a JSON response with the message
        status: "success",
        message: "Login successful!",
        data: {
          token: token,
        },
      });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const userLogout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .status(200)
      .json({
        status: "success",
        message: "Logout successful!",
      });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const token = req.cookies.token;
  let csrf;

  try {
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

      csrf = response.data.data.csrf;
    } catch (error) {
      throw new Error("Error while getting the CSRF token: " + error);
    }

    const trimmedCsrf = csrf.trim();
    const trimmedQueryParamCsrf = req.query.csrf.trim();

    if (trimmedCsrf != trimmedQueryParamCsrf) {
      throw new Error("Invalid CSRF token");
    }

    await userService.deleteUser(req.params.id);

    // Remove the token from the cookie
    res
      .cookie("token", "", {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .status(200)
      .json({
        status: "success",
        message: "User deleted successfully!",
      });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

const validateToken = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (token) {
    req.cookies.token = token;
  }

  try {
    // Had to pass req, res and next to jwtValidate function to make it work
    // Because jwtValidate function is out of the scope of the route handler
    jwtValidate(req, res, () => {});
    res.status(200).json({
      status: "success",
      message: `Token is valid! ${req.user.username}`,
      data: req.user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  createUser,
  userLogin,
  userLogout,
  getUserById,
  deleteUserById,
  validateToken,
};
