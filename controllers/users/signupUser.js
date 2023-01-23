const bcrypt = require("bcrypt");
const { uid } = require("uid");
const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { BASE_URL } = process.env;
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
    const avatarURL = gravatar.url(email);
    const verificationToken = uid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify you email",
      html: `<a target="_blank" href='${BASE_URL}/api/users/verify/${verificationToken}'>Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      // status: "Created",
      // code: 201,
      // data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
      // },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupUser;
