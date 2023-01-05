const express = require("express");

const { users: ctrl } = require("../../controllers");

const { validateBody, authenticate, upload } = require("../../middlewares");

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
  "/subscription",
  validateBody.patchValidateUser(schemas.joiUpdateSchema),
  authenticate,
  ctrl.updateStatusUser
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
