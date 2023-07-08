import MymoAxiosInstance from './instance';
import { type UpdateNoteDTO, type CreateNoteDTO, type DeleteNoteDto, Note } from 'models';

const NoteController = {
  getAll: async () => {
    try {
      const response = await MymoAxiosInstance.get<Note[]>('/');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (note_id: string) => {
    try {
      const response = await MymoAxiosInstance.get<Note>(`/${note_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  update: async (updateNoteDTO: UpdateNoteDTO) => {
    try {
      const response = await MymoAxiosInstance.patch('/', updateNoteDTO);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  create: async (createNoteDTO: CreateNoteDTO) => {
    try {
      const response = await MymoAxiosInstance.post('/', createNoteDTO);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  remove: async (deleteNoteDto: DeleteNoteDto) => {
    try {
      const response = await MymoAxiosInstance.put('/', deleteNoteDto);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default NoteController;
