import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "./user-management-service/models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables from .env file to the process.env object
dotenv.config();

const passportConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },

      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          username: profile.name.givenName,
          name: profile.displayName,
          email: profile.emails[0].value,
          role: "user",
        };

        try {
          let user = await userModel.findOne({
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          });

          if (user) {
            done(null, user);
          } else {
            let excistingUser = await userModel.findOne({
              $or: [{ username: profile.name.givenName }],
            });

            if (excistingUser) {
              throw new Error("User already exists. Login instead!");
            } else {
              user = await userModel.create(newUser);
              done(null, user);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id).then((err, user) => done(err, user));
  });
};

export default passportConfig;
