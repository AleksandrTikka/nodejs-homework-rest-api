const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  addValidateBody,
  putValidateBody,
  patchValidateBody,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getOne);

router.post("/", addValidateBody(schemas.addSchema), ctrl.postOne);

router.delete("/:contactId", isValidId, ctrl.deleteOne);

router.put(
  "/:contactId",
  isValidId,
  putValidateBody(schemas.addSchema),
  ctrl.putOne
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  patchValidateBody(schemas.patchSchema),
  ctrl.updateStatusContact
);
module.exports = router;
