const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateStatusUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!user) {
      next(HttpError(404, "Not found"));
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusUser;
