const { Contact } = require("../../models");
const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  // const filter = typeof favorite === "boolean" ? { favorite } : {};
  try {
    const contacts = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email");
    if (!contacts) {
      throw error;
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
