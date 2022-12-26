const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getOneContact);

router.post(
  "/",
  authenticate,
  validateBody.addValidateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteOneContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody.putValidateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody.patchValidateBody(schemas.patchSchema),
  ctrl.updateStatusContact
);
module.exports = router;
