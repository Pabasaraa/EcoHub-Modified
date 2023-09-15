import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

// Auth with Google
// @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // After successful authentication, generate the token
    const csrf = crypto.randomUUID();

    const token = jwt.sign(
      {
        _id: req.user._id,
        username: req.user.username,
        role: req.user.role,
        csrf: csrf,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );

    // Set the token as a cookie in the response
    // and redirect the user to the profile page
    res
      .cookie("token", token, {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .redirect("http://localhost:3000/profile");
  }
);

export default router;
