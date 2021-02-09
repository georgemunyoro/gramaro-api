import { PrismaClient } from "@prisma/client";
import { makeNote } from "../entities/note";
import { NoteEntity, NoteInterface } from "../entities/note/note";

export interface NoteDatabase {
  create: (noteData: NoteEntity) => any;
  update: (noteId: string, updatedNote: NoteEntity) => any;
  remove: (noteId: string) => any;
  findById: (id: string) => Promise<NoteInterface | null>;
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

  const create = async (data: NoteEntity) => {
    try {
      const db = await getDatabaseConnection();
      await db.notes.create({
        data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const update = async (noteId: string, updatedNote: NoteEntity) => {
    try {
      const db = await getDatabaseConnection();
      await db.notes.update({
        where: {
          id: noteId,
        },
        data: updatedNote,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const remove = async (noteId: string) => {
    try {
      const db = await getDatabaseConnection();
      await db.notes.delete({
        where: {
          id: noteId,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return Object.freeze({
    findById,
    findByUser,
    create,
    update,
    remove,
  });
};
