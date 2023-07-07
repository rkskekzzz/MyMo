import MymoAxiosInstance from './instance';
import type { UpdateMemoDTO, CreateMemoDTO } from 'models';
const MemoController = {
  getAll: async () => {
    try {
      const response = await MymoAxiosInstance.get('/');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (memo_id: string) => {
    try {
      const response = await MymoAxiosInstance.get(`/${memo_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  update: async (updateMemoDTO: UpdateMemoDTO) => {
    try {
      const response = await MymoAxiosInstance.patch('/', updateMemoDTO);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  create: async (createMemoDTO: CreateMemoDTO) => {
    try {
      const response = await MymoAxiosInstance.post('/', createMemoDTO);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (memo_id: string) => {
    try {
      const response = await MymoAxiosInstance.delete(`/${memo_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default MemoController;
