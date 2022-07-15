import { Router } from 'express';

import { AUTH_CREDENTIALS } from '@utils/config';
import { authMiddleware } from '../middlewares/authenticator';
import ChampionsController from '@controllers/ChampionsController';

const publicRouter = Router();
const authentication = authMiddleware(AUTH_CREDENTIALS.x_api_key);

const championsController = new ChampionsController();

publicRouter.get('/champions', authentication, championsController.list);

export default publicRouter;
