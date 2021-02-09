import { NoteEntity, NoteInterface } from "../entities/note/note";

export interface HttpRequest {
  query: any;
  params: any;
}

interface makeGetNotesArgs {
  listNotes: ({
    noteId,
  }: {
    noteId: string;
  }) => Promise<(NoteInterface | null)[]>;
}

const makeGetNotes = ({ listNotes }: makeGetNotesArgs) => {
  return async (httpRequest: HttpRequest) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const notes = await listNotes({
        noteId: httpRequest.params.id,
      });

      return {
        headers,
        statusCode: 200,
        body: notes.map((note) => note?.getNote()),
      };
    } catch (error) {
      console.error(error);
      return {
        headers,
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
};

export default makeGetNotes;
