import UserDirectory from "../../../models/Directory.js";

const getAllUsersService = async () => {
  const users = await UserDirectory.find()
    .sort({ name: 1 })
    .lean();

  return users;
};

export default getAllUsersService;