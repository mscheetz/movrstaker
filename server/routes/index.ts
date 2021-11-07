import { Router } from 'express';
import AddressController from '../controllers/address.controller';
import LoginController from '../controllers/login.controller';
import MovrController from '../controllers/movr.controller';
import { logReq } from '../middleware/api-middleware';
import { jwtCheck } from '../middleware/auth.middleware';

const router = Router();

router.get('/v1/info/:address', [ logReq ], MovrController.getData);
router.get('/v1/address', [ logReq ], AddressController.getAddresses);
router.get('/v1/login', [ logReq ], LoginController.login);

export default router;