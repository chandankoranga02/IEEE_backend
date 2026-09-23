import bcrypt from "bcrypt";
import User from "../../../models/user.js";
import signJwt from "../../../utils/jwt.sign.js";

const LoginService = async (email, password) => {
  const ADMIN_EMAIL = "ieee@gbpiet.ac.in";

  if (!email || email.toLowerCase() !== ADMIN_EMAIL) {
    throw new Error("Unauthorized email");
  }

  const user = await User.findOne({
    email: ADMIN_EMAIL,
  }).select("+hashedPassword");

  if (!user) {
    throw new Error("Admin account not found");
  }

  const passwordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordValid) {
    throw new Error("Incorrect password");
  }

  const token = signJwt({
    userId: user._id.toString(),
  });

  return {
    user: {
      id: user._id,
      email: user.email,
    },
    token,
  };
};

export default LoginService;
