import LoginService from "./services/Login.service.js";
import SingupService from "./services/Singup.service.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { user, token } = await LoginService(email, password);

    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("Token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await SingupService(email, password);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Signup failed",
    });
  }
};

export { Login, Logout, signup };