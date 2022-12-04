const express = require("express");
const createError = require("http-errors");

const { NotFound } = require("http-errors");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});
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
    if (!contacts) {
      throw error;
    }
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
    // next(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      // throw new NotFound(`Contact with id=${contactId} not found`);
      throw createError(404, `Contact with id=${contactId} not found`);

      // const error = new Error(`Contact with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      // res.status(404).json({
      // status: "error",
      // code: 404,
      // message: `Contact with id=${contactId} not found`,
      // });
      // return;
    }
    res.json({
      message: `Contact with id=${contactId} was finded successfully`,
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const result = addContact(req.body);
    res.status(201).json({
      message: "template message",
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
