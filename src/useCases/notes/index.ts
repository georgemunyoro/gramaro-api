import makeListNotes from "./listNotes";
import { noteDatabase } from "../../db";

const listNotes = makeListNotes({
  noteDatabase,
});

export const noteService = Object.freeze({
  getNotes: listNotes,
});
