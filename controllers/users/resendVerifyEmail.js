const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.verify) {
      throw HttpError(404, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify you email",
      html: `<a target="_blank" href='${BASE_URL}/api/users/verify/${user.verificationToken}'>Click verify email</a>`,
    };
    res.json({ message: "Verification email sent" });
    await sendEmail(verifyEmail);
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
