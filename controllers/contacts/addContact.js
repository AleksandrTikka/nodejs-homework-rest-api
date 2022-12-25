const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
