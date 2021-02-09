import makeExpressCallback from "../expressCallback";
import { getNotes, deleteNote, updateNote, createNote } from "../controllers";

const nanoid = require("nanoid").customAlphabet("1234567890abcdef_", 10);
const express = require("express");
const notesRouter = express.Router();

notesRouter.get("/:id", makeExpressCallback(getNotes));
notesRouter.delete("/:id", makeExpressCallback(deleteNote));
notesRouter.patch("/:id", makeExpressCallback(updateNote));
notesRouter.post("/", makeExpressCallback(createNote));

export default notesRouter;
