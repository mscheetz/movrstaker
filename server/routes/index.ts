import { Router } from 'express';
import MovrController from '../controllers/movr.controller';
import { logReq } from '../middleware/api-middleware';

const router = Router();

router.get('/info/:address', [ logReq ], MovrController.getData);

export default router;