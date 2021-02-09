export interface NoteEntity {
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  contents: string;
}

export interface NoteInterface {
  getOwner: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
  getContents: () => string;
  getId: () => string;
  getNote: () => NoteEntity;
}

interface buildMakeNoteArgs {}

export const buildMakeNote = ({}: buildMakeNoteArgs) => {
  return ({
    createdAt = new Date(),
    updatedAt = new Date(),
    owner,
    id,
    contents,
  }: NoteEntity): NoteInterface => {
    return Object.freeze({
      getOwner: () => owner,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getContents: () => contents,
      getId: () => id,
      getNote: () => ({
        owner,
        createdAt,
        updatedAt,
        contents,
        id,
      }),
    });
  };
};
