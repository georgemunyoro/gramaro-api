const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    message: "user",
    data: {
      user: req.body,
    },
  });
});

module.exports = router;
