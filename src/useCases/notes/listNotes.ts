import { NoteDatabase } from "../../db/note";

interface makeListNotesArgs {
  noteDatabase: NoteDatabase;
}

interface listNotesArgs {
  noteId: string;
}

const makeListNotes = ({ noteDatabase }: makeListNotesArgs) => {
  return async ({ noteId }: listNotesArgs) => {
    if (!noteId) throw new Error("note id is required.");
    try {
      const notes = await noteDatabase.findById(noteId);
      return [notes];
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export default makeListNotes;
