import "dotenv/config";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  return secret;
};

const signJwt = (payload, options = { expiresIn: "15d" }) => {
  return jwt.sign(payload, getJwtSecret(), options);
};

export default signJwt;
