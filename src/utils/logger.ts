/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pino from 'pino';

export class Logger {
  public logger: pino.Logger;
  public test: boolean | undefined;

  constructor(service: string, method: string, id: string, route: string, test?: boolean) {
    this.logger = pino({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    });
    this.logger = this.logger.child({ service, method, id, route });
    this.test = test;
  }

  log(message: string, data = {}): void {
    if (this.test) {
      return;
    }
    this.logger.info({ data }, message);
  }

  error(message: string, error: any): void {
    if (this.test) {
      return;
    }

    if (error && Object.prototype.hasOwnProperty.call(error, 'toString') && typeof error.toString === 'function') {
      message = message + ' | ' + error.toString();
    }

    this.logger.error(error, message);
  }
}

