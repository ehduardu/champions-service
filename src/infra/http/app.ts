import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import specs from '../../../swagger.json';

import routes from './routes';
import { expressErrorsHandler } from './middlewares/errorsHandler';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  const swagger = require('swagger-ui-express');
  app.use(
    '/docs',
    swagger.serve,
    swagger.setup(specs, { explorer: true })
  );
}

app.use(routes);
app.use(expressErrorsHandler('champions-service'));

export default app;
