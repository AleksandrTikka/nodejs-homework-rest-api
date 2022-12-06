const { getContactById } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const getOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getOne;
