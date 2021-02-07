import { UserEntity } from "../user";

export interface NoteEntity {
  owner: UserEntity;
  createdAt: number;
  updatedAt: number;
  uuid: string;
  id: number;
  contents: string;
}

interface buildMakeNoteArgs {}

export function buildMakeNote({}: buildMakeNoteArgs) {
  return function makeNote({
    owner,
    createdAt = Date.now(),
    updatedAt = Date.now(),
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
