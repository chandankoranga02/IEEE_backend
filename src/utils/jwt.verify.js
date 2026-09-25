import "dotenv/config";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  return secret;
};

const JwtVerify = (token) => {
  return jwt.verify(token, getJwtSecret());
};

export default JwtVerify;
