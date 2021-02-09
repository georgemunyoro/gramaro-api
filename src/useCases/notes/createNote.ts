import { makeNote } from "../../entities/note";
import { NoteEntity } from "../../entities/note/note";
import { noteDatabase } from "../../db";

const makeCreateNote = ({ database }: { database: any }) => {
  return async (noteInfo: NoteEntity): Promise<any> => {
    const note = makeNote(noteInfo);

    try {
      const row = await database.note.create({
        data: {
          userId: note.getOwner(),
          contents: note.getContents(),
        },
      });
      await database.user.update({
        where: {
          id: note.getOwner(),
        },
        data: {
          Note: {
            connect: {
              id: note.getId(),
            },
          },
        },
      });

      return row;
    } catch (error) {
      console.error(error.message);
    }
  };
};
export default makeCreateNote;
