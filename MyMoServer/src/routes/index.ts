import { Router } from 'express';

import { MemoController } from '../controllers';

const router: Router = Router();

// 메모 라우터
router.get('/', MemoController.getAll);
router.get('/:memo_id', MemoController.getOne);
router.post('/', MemoController.create);
router.patch('/', MemoController.update);
router.delete('/:memo_id', MemoController.remove);

export default router;
