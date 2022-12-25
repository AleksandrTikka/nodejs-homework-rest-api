const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  //деструктуризация по умолчанию, если статус не приходит,
  // статус будет 500, если сообщение не приходит, то сообщение
  // будет "Server error"
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
  /*это же можно записать так:
  const status  = err.status || 500;
  const message = err.message || "Server error"
  */
});

module.exports = app;
