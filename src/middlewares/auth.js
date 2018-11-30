import jwt from "jsonwebtoken";
import authJson from "../config/auth.json";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "No token provided." });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ message: "Token error." });
  }

  const [scheme, token] = parts;

  jwt.verify(token, authJson.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token invalid" });
    }

    req.userId = decoded.id;
    return next();
  });
};
