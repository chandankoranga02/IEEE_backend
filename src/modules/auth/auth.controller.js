import LoginService from "./services/Login.service.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await LoginService(email, password);

    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      msg: "Login Successfull ",
      success: true,
      user: user,
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

export { Login, Logout };
export default { Login, Logout };

