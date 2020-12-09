const express = require("express");

const { handleEmptyData, handleUnexpectedError } = require("./helpers");
const { getDatabaseConnection } = require("../database");

const router = express.Router();

router.post("/", async (req, res) => {
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

      if (user[0].password !== password) {
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

module.exports = router;
