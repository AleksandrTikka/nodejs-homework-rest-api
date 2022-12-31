const fs = require("fs/promises");
const path = require("path");
const { HttpError } = require("../../helpers");
const { resizeAvatar } = require("../../middlewares");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    await resizeAvatar(tempUpload);
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    const user = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!user) {
      throw HttpError(404, "Not found");
    }

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateAvatar;
