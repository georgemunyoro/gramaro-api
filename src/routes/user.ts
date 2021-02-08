const express = require("express");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  res.json({
    message: "user",
    data: {
      user: req.body,
    },
  });
});

export default usersRouter;
