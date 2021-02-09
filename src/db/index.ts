import { PrismaClient } from "@prisma/client";
import { makeNoteDatabase } from "./note";

const prisma = new PrismaClient();

export const getDatabaseConnection = async () => prisma;

export const noteDatabase = makeNoteDatabase({
  getDatabaseConnection,
});
