const handleMongooseError = (error, data, next) => {
  console.log("error handler");
  const { name, code } = error;
  console.log(name);
  console.log(code);
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

module.exports = handleMongooseError;
