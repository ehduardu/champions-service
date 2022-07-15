import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CelebrateError, errors } from 'celebrate';
import axios from 'axios';

import { Logger } from '@utils/logger';
import { ServiceError } from '@utils/ServiceError';

const CELEBRATE_ERROR_HANDLER = errors();

/**
 * @description Faz o tratamento de erros `ServiceError`, `CelebrateError`, `AxiosError` e desconhecidos.
 * @param serviceName Nome do microsserviço que o usa
 * @returns Retorna um Handler para ser usado no APP Express para serviços
 */
export const expressErrorsHandler = (serviceName = 'service'): ErrorRequestHandler => (error: CelebrateError | ServiceError | Error | any, request: Request, response: Response, next: NextFunction): void => {
  const logger = new Logger(serviceName, request.method, 'expressErrorsHandler', request.path);
  const errorContext = { error: error.message, body: request.body, headers: request.headers, query: request.query, params: request.params };

  logger.log(`[${serviceName}] - expressErrorsHandler`, errorContext);

  if (error instanceof ServiceError) {
    logger.error(`[${serviceName}] - expressErrorsHandler - ServiceError | ${error.message}`, error,);
    response.status(error.status || 400).send(JSON.parse(error.message));

  } else if (error instanceof CelebrateError) {
    logger.error(`[${serviceName}] - expressErrorsHandler - CelebrateError | ${error.message}`, error);
    CELEBRATE_ERROR_HANDLER(error, request, response, next);

  } else if (axios.isAxiosError(error)) {
    const axiosError = error.response?.data?.error ?? error.response?.data ?? error.response;

    logger.error(`[${serviceName}] - expressErrorsHandler - AxiosError | ${axiosError.message}`, axiosError);
    response.status(500).send(axiosError);

  } else {
    logger.error(`[${serviceName}] - expressErrorsHandler - UnknownError | ${error.message}`, error);
    response.status(500).send(error.message);

  }
};