import { Request, Response } from 'express';
import { NoteService } from '../services';
import { CreateNoteDTO, DeleteNoteDTO, UpdateNoteDTO } from '../interface/dto';
import 'express-async-errors';

async function create(req: Request, res: Response): Promise<Response> {
  const createNoteDTO: CreateNoteDTO = req.body;
  const note = await NoteService.create(createNoteDTO);

  return res.status(200).json(note);
}

async function getOne(req: Request, res: Response): Promise<Response> {
  const note_id: string = req.params.note_id;
  const note = await NoteService.getOne(note_id);

  return res.status(200).json(note);
}

async function getAll(req: Request, res: Response): Promise<Response> {
  const notes = await NoteService.getAll();

  return res.status(200).json(notes);
}

async function update(req: Request, res: Response): Promise<Response> {
  const updateNoteDTO: UpdateNoteDTO = req.body;

  const note = await NoteService.update(updateNoteDTO);

  return res.status(200).json(note);
}

async function remove(req: Request, res: Response): Promise<Response> {
  const deletedNoteDTO: DeleteNoteDTO = req.body;

  const note = await NoteService.remove(deletedNoteDTO);

  return res.status(200).json(note);
}

const NoteController = {
  create,
  update,
  getOne,
  getAll,
  remove
};

export default NoteController;
