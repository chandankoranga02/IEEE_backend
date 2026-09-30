import bcrypt from "bcrypt";
import User from "../../../models/user.js";

const SignupService = async (email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    email,
    hashedPassword,
  });

  return {
    user: {
      id: user._id,
      email: user.email,
    },
  };
};

export default SignupService;