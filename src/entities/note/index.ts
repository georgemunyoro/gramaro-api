import makeCreateNote from "../../useCases/notes/createNote";
import { prisma } from "../../utils/db";

export const makeNote = makeCreateNote({
  database: prisma,
});
