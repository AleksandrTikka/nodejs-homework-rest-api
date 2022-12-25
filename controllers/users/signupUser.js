const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const signupUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      // status: "Created",
      // code: 201,
      // data: {
      user: {
        email: newUser.email,
      },
      // },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupUser;
