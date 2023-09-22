import { Response } from 'express';

export const successRes = (res: Response, statusCode: number, data: any) => {
  return res.status(statusCode).json(data);
};

export const errorRes = (res: Response, statusCode: number) => {
  return res.status(statusCode);
};
