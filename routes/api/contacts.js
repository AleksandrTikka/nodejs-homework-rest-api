const express = require("express");
// const contacts = require("../../models/contacts.json");
const router = express.Router();
// const { v4 } = require("uuid");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(
      // contacts
      {
        message: "All contacts was finded successfully",
        status: "success",
        code: 200,
        data: { result: contacts },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await getContactById(contactId);
    if (!oneContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${contactId} not found`,
      });
    }
    res.json({
      message: `Contact with id=${contactId} was finded successfully`,
      status: "success",
      code: 200,
      data: { result: oneContact },
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = addContact(req.body);
    res.status(201).json({
      message: "template message",
      status: "success",
      code: 201,
      newContact,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
