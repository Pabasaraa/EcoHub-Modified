import jwt from "jsonwebtoken";

const jwtValidate = (req, res, next) => {
  const token = req.cookies.token;
  // For API testing use below line of code, comment out above line
  // const token = req.body.token;

  if (!token) {
    throw new Error("No token provided!");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      throw new Error("Failed to authenticate token. Error: " + error.message);
    }
  }
};

export default jwtValidate;
