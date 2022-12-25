const express = require("express");

const { users: ctrl } = require("../../controllers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody.addValidateBody(schemas.joiRegisterSchema),
  ctrl.signupUser
);

router.post(
  "/login",
  validateBody.addValidateBody(schemas.joiLoginSchema),
  ctrl.loginUser
);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logoutUser);

router.post(
  "/:userId/subscription",
  validateBody.patchValidateUser(schemas.joiUpdateSchema),
  // authenticate,
  ctrl.updateStatusUser
);
module.exports = router;
