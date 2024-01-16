import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You Are Not Authenticated"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Invalid Token"));
    req.User = user;
    next();
  });
};
