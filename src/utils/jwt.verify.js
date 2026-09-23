import "dotenv/config";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || "ieee_gbpiet_secret_key_2025_jwt_token_auth";
  return secret;
};

const JwtVerify = (token) => {
  return jwt.verify(token, getJwtSecret());
};

export default JwtVerify;