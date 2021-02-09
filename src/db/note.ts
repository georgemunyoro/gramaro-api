import { makeNote } from "../entities/note";
import { NoteInterface } from "../entities/note/note";

export interface NoteDatabase {
  create: () => any;
  update: () => any;
  remove: () => any;
  findById: (id: string) => Promise<NoteInterface | null>;
  findByUuid: () => {};
  findByUser: (userId: number) => Promise<any>;
}

export const makeNoteDatabase = ({
  getDatabaseConnection,
}: {
  getDatabaseConnection: () => any;
}): NoteDatabase => {
  const findById = async (id: string): Promise<NoteInterface | null> => {
    try {
      const db = await getDatabaseConnection();
      const note = await db.notes.findUnique({
        where: {
          id,
        },
      });

      return makeNote({
        ...note,
        contents: JSON.stringify(note.content),
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const findByUser = async (userId: number): Promise<any> => {
    try {
      const db = await getDatabaseConnection();
      const notes = await db.notes.findMany({
        where: {
          user: userId,
        },
      });

      return notes.map((note: any) =>
        makeNote({
          ...note,
          contents: JSON.stringify(note.content),
        })
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const create = async () => {};

  const update = async () => {};

  const remove = async () => {};

  return Object.freeze({
    findById,
    findByUuid,
    findByUser,
    create,
    update,
    remove,
  });
};
