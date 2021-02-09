import { noteService } from "../useCases/notes";
import makeGetNotes from "./note";

export const getNotes = makeGetNotes({listNotes: noteService.getNotes});