const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const deleteOneContact = async (req, res, next) => {
  {
    try {
      const { contactId } = req.params;
      const deletedContact = await Contact.findByIdAndRemove(contactId);
      if (!deletedContact) {
        throw HttpError(404, "Not found");
      }
      res.json({ message: "contact deleted", deletedContact });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = deleteOneContact;
