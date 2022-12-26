const res = require("express/lib/response");

const getCurrentUser = (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
