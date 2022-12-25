const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getOneContact;
