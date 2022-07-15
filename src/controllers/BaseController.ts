import { Request } from 'express';
import { Logger } from '@utils/logger';

export default class BaseController {
  private service = 'champions-service';

  getLogger = (request: Request, id: string, initialMessage: string): Logger => {
    const logger = new Logger(this.service, request.method, id, request.path);
    logger.log(`[${request.method} ${request.path}] - ${initialMessage}`,
      {
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      }
    );

    return logger;
  }
}