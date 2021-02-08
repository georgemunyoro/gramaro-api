export interface NoteEntity {
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  uuid: string;
  id: number;
  contents: string;
  getOwner?: () => number;
  getCreatedAt?: () => Date;
  getUpdatedAt?: () => Date;
  getContents?: () => string;
  getId?: () => number;
  getUuid?: () => string;
}

interface buildMakeNoteArgs {}

export function buildMakeNote({}: buildMakeNoteArgs) {
  return function makeNote({
    ownerId,
    createdAt = new Date(),
    updatedAt = new Date(),
    uuid,
    id,
    contents,
  }: NoteEntity) {
    return Object.freeze({
      getOwner: () => owner,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getContents: () => contents,
      getId: () => id,
      getUuid: () => uuid,
    });
  };
}
