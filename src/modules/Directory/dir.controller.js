import getAllUsersService from "./services/userDirectory.service.js";

 const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export default getAllUsers;