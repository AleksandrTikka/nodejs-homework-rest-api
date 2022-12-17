const { Contact } = require("../../models/contact");
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) {
      throw error;
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
