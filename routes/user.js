const express = require("express");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef_', 10);

const { handleEmptyData, handleUnexpectedError } = require("./helpers");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
	message: "user",
	data: {
	  user: req.body
	}
  })
});

module.exports = router;

