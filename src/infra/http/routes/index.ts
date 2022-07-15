import { Router } from 'express';
const routes = Router();

import internalRouter from './internal';
import publicRouter from './public';

routes.use('/internal', internalRouter);
routes.use('/', publicRouter);

export default routes;
