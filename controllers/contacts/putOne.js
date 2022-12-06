const { updateContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const putOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      next(HttpError(404, "Not found"));
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
module.exports = putOne;
