import "dotenv/config";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || "ieee_gbpiet_secret_key_2025_jwt_token_auth";
  return secret;
};

const signJwt = (payload, options = { expiresIn: "15d" }) => {
  return jwt.sign(payload, getJwtSecret(), options);
};

export default signJwt;