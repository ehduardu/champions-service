import { RequestHandler, Request, Response, NextFunction } from 'express';

import { ServiceError } from '@utils/ServiceError';
import { ERROR_CODES } from '@utils/errors';

export enum HEADERS {
  X_API_KEY = 'x-api-key',
  APP_ENGINE_USER_IP = 'x-appengine-user-ip',
  APP_ENGINE_CRON = 'X-Appengine-Cron',
  AUTHORIZATION = 'authorization',
  X_ID = 'x-id',
  X_INTERNAL_SECRET = 'x-internal-secret'
}

/**
 * @description Faz a validação de requisições internas com base na `apiKey` passada pelo usuário
 * @param apiKey string secreta de validação de requisições no microsserviço
 * @returns Retorna um `express.RequestHandler` que faz a autenticação do header da requisição
 */
export const authMiddleware = (apiKey: string): RequestHandler => (request: Request, _: Response, next: NextFunction): void => {
  const requestSecret = request.header(HEADERS.X_API_KEY);
  if (!requestSecret?.includes(apiKey)) throw new ServiceError(ERROR_CODES.PERMISSION_DENIED);
  next();
};
