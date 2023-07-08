import { Router } from 'express';

import { NoteController } from '../controllers';

const router: Router = Router();

// 메모 라우터
router.get('/', NoteController.getAll);
router.get('/:note_id', NoteController.getOne);
router.post('/', NoteController.create);
router.patch('/', NoteController.update);
router.put('/', NoteController.remove);

export default router;
