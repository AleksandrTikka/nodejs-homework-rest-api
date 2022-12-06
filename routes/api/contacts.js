const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares");

const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", validateBody.addValidateBody(addSchema), ctrl.postOne);

router.delete("/:contactId", ctrl.deleteOne);

router.put("/:contactId", validateBody.putValidateBody(addSchema), ctrl.putOne);

module.exports = router;
