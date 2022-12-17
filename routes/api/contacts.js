const express = require("express");

const { contacts } = require("../../controllers");

const {
  addValidateBody,
  putValidateBody,
  patchValidateBody,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", contacts.getAllContacts);

router.get("/:contactId", isValidId, contacts.getOneContact);

router.post("/", addValidateBody(schemas.addSchema), contacts.addContact);

router.delete("/:contactId", isValidId, contacts.deleteOneContact);

router.put(
  "/:contactId",
  isValidId,
  putValidateBody(schemas.addSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  patchValidateBody(schemas.patchSchema),
  contacts.updateStatusContact
);
module.exports = router;
