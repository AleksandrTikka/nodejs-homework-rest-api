const { HttpError } = require("../helpers");

const addValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    next();
  };
  return func;
};

const putValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing fields"));
    }
    next();
  };
  return func;
};

const patchValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing fields favorite"));
    }
    next();
  };
  return func;
};

module.exports = { addValidateBody, putValidateBody, patchValidateBody };
