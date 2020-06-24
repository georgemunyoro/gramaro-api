const express = require("express");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef_', 10);

const { handleUnexpectedError, handleEmptyData } = require("./helpers");
const { getDatabase } =require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
	message: "notes",
	data: null
  })
});

router.get("/all", async (req, res) => {
  try {
	const client = getDatabase();
	const { rows: notes } = await client.query("SELECT * FROM NOTES");

	res.json({
	  message: "notes",
	  data: { notes: notes || null }
	});

	client.end();
  } catch (error) { 
	handleUnexpectedError(error, res);
  }
});

router.post("/", async (req, res) => {
  const { title, contents, owner } = req.body;
  const uniqueNoteId = nanoid(12);
  try {
	const client = getDatabase();
	const queryData = [uniqueNoteId, title, contents, owner];
	const { rows } = await client.query("INSERT INTO NOTES (ID, TITLE, CONTENT, OWNER) VALUES ($1, $2, $3, $4)", queryData);
	res.json({
	  message: "create note",
	  data: {
		note: {
		  id: uniqueNoteId,
		  owner: owner,
		  title: title,
		  contents: contents
		},
		rows: rows
	  }
	});
	client.end();
  } catch (error) {
	handleUnexpectedError(res, error);
  }
});

router.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, contents } = req.body;
  try {
	const client = getDatabase();
	const { rows } = await client.query(`UPDATE NOTES SET TITLE='${title}', CONTENT='${contents}' WHERE ID='${noteId}'`);
	res.json({
	  message: "update note",
	  data: {
		note: {
		  noteId: noteId,
		  title: title,
		  contents: contents
		},
		rows: rows
	  }
	});
	client.end();
  } catch (error) {
	handleUnexpectedError(res, error);
  }
})

router.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
	const client = getDatabase();
	const { rows } = await client.query(`DELETE FROM NOTES WHERE ID='${noteId}'`);
	res.json({
	  message: "note deleted",
	  data: {
		noteId: noteId,
		note: rows
	  }
	});
	client.end();
  } catch (error) {
	handleUnexpectedError(res, error);
  }
});

router.get("/:user", async (req, res) => {
  const { user } = req.params;
  try {
	const client = getDatabase();
	const { rows: notes } = await client.query(`SELECT * FROM NOTES WHERE OWNER='${user}'`);
	res.json({
	  message: "user notes",
	  data: {
		user: user,
		notes: notes || null
	  }
	});
	client.end();
  } catch (error) {
	handleUnexpectedError(res, error);
  }
});

module.exports = router;

