import { IErrorInterface } from './interfaces';

export class ServiceError extends Error {
  name: string;
  code: string;
  status: number;

  constructor({ code, message, name, status }: IErrorInterface) {
    super(JSON.stringify({ name, message, code, status }));
    this.name = name;
    this.code = code;
    this.status = status;
  }
}