const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const getOne = async (req, res, next) => {
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

module.exports = getOne;
