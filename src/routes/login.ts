const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { handleEmptyData, handleUnexpectedError } = require("../utils");
const { getDatabaseConnection } = require("../utils/db/connection");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (email === null || password === null) {
    handleEmptyData(req, res);
  } else {
    try {
      const databaseConnection = getDatabaseConnection();
      const { rows: user } = await databaseConnection.query(
        `SELECT ID, USERNAME, PASSWORD FROM USERS WHERE EMAIL='${email}'`
      );

      if (user.length === 0) {
        res.json({ message: "Could not find user" });
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
      if (!isPasswordCorrect) {
        res.json({ message: "Incorrect password" });
        return;
      }

      res.json({
        message: "ok",
        data: {
          uuid: user[0].id,
          username: user[0].username,
        },
      });
      databaseConnection.end();
    } catch (error) {
      handleUnexpectedError(res, error);
    }
  }
});

export default loginRouter;
