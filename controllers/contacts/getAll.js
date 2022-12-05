const { listContacts } = require("../../models/contacts");
const HttpError = require("../../helpers");
const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      throw error;
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
