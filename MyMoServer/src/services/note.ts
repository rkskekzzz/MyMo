import { CreateNoteDTO, DeleteNoteDTO, UpdateNoteDTO } from '../interface/dto';
import ApiError from '../modules/error';
import { Note } from '../interface/entity';
import { NoteModel } from '../db';

async function create(CreateNoteDTO: CreateNoteDTO): Promise<Note> {
  try {
    return NoteModel.create({ ...CreateNoteDTO, syncedAt: new Date() });
  } catch (error) {
    throw new ApiError(500, 'Error : Saving Note');
  }
}

async function update(updateNoteDTO: UpdateNoteDTO): Promise<Note> {
  try {
    const note = await NoteModel.findById(updateNoteDTO._id);
    if (!note) {
      throw new ApiError(404, 'Error : Note Not Found');
    }

    note.title = updateNoteDTO.title;
    note.content = updateNoteDTO.content;
    note.updatedAt = updateNoteDTO.updatedAt;
    note.deletedAt = updateNoteDTO.deletedAt;
    note.syncedAt = new Date();

    const updatedNote = await note.save();

    return updatedNote;
  } catch (error) {
    throw new ApiError(500, 'Error : Updating Note');
  }
}

async function remove(deleteNoteDTO: DeleteNoteDTO): Promise<Note> {
  try {
    const note = await NoteModel.findById(deleteNoteDTO._id);
    if (!note) {
      throw new ApiError(404, 'Error : Note Not Found');
    }

    note.syncedAt = new Date();
    note.updatedAt = deleteNoteDTO.deletedAt;
    note.deletedAt = deleteNoteDTO.deletedAt;

    const deletedNote = await note.save();

    return deletedNote;
  } catch (error) {
    throw new ApiError(500, 'Error : Deleting Note');
  }
}

async function getOne(note_id: string): Promise<Note> {
  try {
    const note = await NoteModel.findById(note_id);
    if (!note) {
      throw new ApiError(404, 'Error : Note Not Found');
    }

    return note;
  } catch (error) {
    throw new ApiError(500, 'Error : Retrieving Note');
  }
}

async function getAll(): Promise<Note[]> {
  try {
    const notes = await NoteModel.find();

    return notes;
  } catch (error) {
    throw new ApiError(500, 'Error : Retrieving Notes');
  }
}

const UserService = {
  create,
  update,
  remove,
  getOne,
  getAll
};

export default UserService;
