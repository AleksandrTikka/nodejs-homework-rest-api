const { updateContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
// const { addSchema } = require("../../schemas/contacts");
const putOne = async (req, res, next) => {
  try {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, "missing fields");
    // }
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
