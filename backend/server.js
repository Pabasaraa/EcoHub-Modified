import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./database.js";
import dotenv from "dotenv";
// Import passport for authentication
import passport from "passport";
import session from "express-session";
// helmet is used to setup the CSP (Content Security Policy) headers
import helmet from "helmet";

// Passport config
import passportConfig from "./passport.js";
passportConfig(passport);

// Import routes
import ProductRoutes from "./product-management-service/routes/product.route.js";
import userRoutes from "./user-management-service/routes/user.route.js";
import seminarRoutes from "./seminar-management/routes/seminar.route.js";
import OrderRoutes from "./order-management-service/routes/order.route.js";
import ReviewRouter from "./review-management-service/routes/review.route.js";
import ArticleRoutes from "./article-management-service/routes/article.route.js";
import Auth from "./common-routes/auth.route.js";

// Load environment variables from .env file to the process.env object
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// Enable CORS to allow API requests only from localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable credentials (cookies, headers)
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cookieParser());

// Use Helmet middleware to set Content Security Policy header
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'http://localhost:3000'"], // Add domains from which scripts can be loaded
      styleSrc: ["'self'", "'http://localhost:3000'"], // Add domains from which styles can be loaded
    },
  })
);

// Express session
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: false, // Ensure session cookie is httpOnly
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
      domain: "localhost",
      path: "/", // Set cookie path to root
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", Auth);
app.use("/products", ProductRoutes);
app.use("/users", userRoutes);
app.use("/seminars", seminarRoutes);
app.use("/orders", OrderRoutes);
app.use("/reviews", ReviewRouter);
app.use("/articles", ArticleRoutes);

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
