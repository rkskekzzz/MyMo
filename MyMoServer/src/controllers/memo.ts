import { Request, Response } from 'express';
import { MemoService } from '../services';
import { CreateMemoDTO, DeleteMemoDTO, UpdateMemoDTO } from '../interface/dto';
import 'express-async-errors';

async function create(req: Request, res: Response): Promise<Response> {
  const createMemoDTO: CreateMemoDTO = req.body;
  const memo = await MemoService.create(createMemoDTO);

  return res.status(200).json(memo);
}

async function getOne(req: Request, res: Response): Promise<Response> {
  const memo_id: string = req.params.memo_id;
  const memo = await MemoService.getOne(memo_id);

  return res.status(200).json(memo);
}

async function getAll(req: Request, res: Response): Promise<Response> {
  const memos = await MemoService.getAll();

  return res.status(200).json(memos);
}

async function update(req: Request, res: Response): Promise<Response> {
  const updateMemoDTO: UpdateMemoDTO = req.body;

  const memo = await MemoService.update(updateMemoDTO);

  return res.status(200).json(memo);
}

async function remove(req: Request, res: Response): Promise<Response> {
  const deletedMemoDTO: DeleteMemoDTO = req.body;

  const memo = await MemoService.remove(deletedMemoDTO);

  return res.status(200).json(memo);
}

const MemoController = {
  create,
  update,
  getOne,
  getAll,
  remove
};

export default MemoController;
