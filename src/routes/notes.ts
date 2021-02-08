const { handleUnexpectedError } = require("../utils");
const { getDatabaseConnection } = require("../utils/db/connection");

const nanoid = require("nanoid").customAlphabet("1234567890abcdef_", 10);
const express = require("express");
const notesRouter = express.Router();

notesRouter.get("/all", async (req, res) => {
  try {
    const client = getDatabaseConnection();
    const { rows: notes } = await client.query("SELECT * FROM NOTES");

    res.json({
      message: "notes",
      data: {
        notes: notes || [],
      },
    });

    client.end();
  } catch (error) {
    handleUnexpectedError(error, res);
  }
});

notesRouter.post("/", async (req, res) => {
  const { title, contents, owner } = req.body;
  const uniqueNoteId = nanoid(12);
  try {
    const client = getDatabaseConnection();
    const queryData = [uniqueNoteId, title, contents, owner];
    const { rows } = await client.query(
      "INSERT INTO NOTES (ID, TITLE, CONTENT, OWNER) VALUES ($1, $2, $3, $4)",
      queryData
    );
    res.json({
      message: "create note",
      data: {
        note: {
          id: uniqueNoteId,
          owner,
          title,
          contents,
        },
        rows: rows,
      },
    });
    client.end();
  } catch (error) {
    handleUnexpectedError(res, error);
  }
});

notesRouter.patch("/trash/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    const databaseConnection = getDatabaseConnection();
    await databaseConnection.query(
      `UPDATE NOTES SET STATUS='trash' WHERE ID='${noteId}'`
    );
    res.json({
      message: "trashed note",
      data: {
        note: {
          noteId,
          status: "trash",
        },
      },
    });
  } catch (error) {
    handleUnexpectedError(error);
  }
});

notesRouter.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, contents } = req.body;
  try {
    const client = getDatabaseConnection();
    const { rows } = await client.query(
      `UPDATE NOTES SET TITLE='${title}', CONTENT='${contents}' WHERE ID='${noteId}'`
    );
    res.json({
      message: "update note",
      data: {
        note: {
          noteId,
          title: title,
          contents: contents,
        },
        rows: rows,
      },
    });
    client.end();
  } catch (error) {
    handleUnexpectedError(res, error);
  }
});

notesRouter.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    const client = getDatabaseConnection();
    const { rows } = await client.query(
      `DELETE FROM NOTES WHERE ID='${noteId}'`
    );
    res.json({
      message: "note deleted",
      data: {
        noteId,
        note: rows,
      },
    });
    client.end();
  } catch (error) {
    handleUnexpectedError(res, error);
  }
});

notesRouter.get("/u/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const client = getDatabaseConnection();
    const { rows: notes } = await client.query(
      `SELECT * FROM NOTES WHERE OWNER='${user}'`
    );
    res.json({
      message: "user notes",
      data: {
        user: user,
        notes: notes || null,
      },
    });
    client.end();
  } catch (error) {
    handleUnexpectedError(res, error);
  }
});

notesRouter.get("/id/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    const client = getDatabaseConnection();
    const { rows } = await client.query(
      `SELECT * FROM NOTES WHERE ID='${noteId}'`
    );
    res.json({
      message: "note",
      data: {
        note: rows[0],
      },
    });
    client.end();
  } catch (error) {
    handleUnexpectedError(res, error);
  }
});

export default notesRouter;
