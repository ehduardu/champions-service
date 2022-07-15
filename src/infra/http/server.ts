import '../../utils/module-alias';
import { Server } from 'http';

import app from './app';

const server = new Server(app);

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Serviço de campeões iniciado na porta ', PORT);
});