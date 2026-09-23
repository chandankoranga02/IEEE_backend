import crypto from "crypto";

export const generateOTP = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);
  return crypto.randomInt(min, max).toString();
};

export const generateRandomNumber = generateOTP;

export default generateOTP;