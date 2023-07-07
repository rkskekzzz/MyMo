import { CreateMemoDTO, UpdateMemoDTO } from '../interface/dto';
import ApiError from '../modules/error';
import { Memo } from '../interface/entity';
import { MemoModel } from '../db';

async function create(CreateMemoDTO: CreateMemoDTO): Promise<Memo> {
  try {
    return MemoModel.create(CreateMemoDTO);
  } catch (error) {
    throw new ApiError(500, 'Error : Saving Memo');
  }
}

async function update(updateMemoDTO: UpdateMemoDTO): Promise<Memo> {
  try {
    const memo = await MemoModel.findById(updateMemoDTO._id);
    if (!memo) {
      throw new ApiError(404, 'Error : Memo Not Found');
    }

    memo.title = updateMemoDTO.title;
    memo.content = updateMemoDTO.content;
    memo.updatedAt = updateMemoDTO.updatedAt;

    const updatedMemo = await memo.save();

    return updatedMemo;
  } catch (error) {
    throw new ApiError(500, 'Error : Updating Memo');
  }
}

async function remove(memo_id: string): Promise<void> {
  try {
    const memo = await MemoModel.findById(memo_id);
    if (!memo) {
      throw new ApiError(404, 'Error : Memo Not Found');
    }

    await memo.remove();
  } catch (error) {
    throw new ApiError(500, 'Error : Deleting Memo');
  }
}

async function getOne(memo_id: string): Promise<Memo> {
  try {
    const memo = await MemoModel.findById(memo_id);
    if (!memo) {
      throw new ApiError(404, 'Error : Memo Not Found');
    }

    return memo;
  } catch (error) {
    throw new ApiError(500, 'Error : Retrieving Memo');
  }
}

async function getAll(): Promise<Memo[]> {
  try {
    const memos = await MemoModel.find();

    return memos;
  } catch (error) {
    throw new ApiError(500, 'Error : Retrieving Memos');
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
