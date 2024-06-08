import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class CheckedIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request id', req);
    next();
  }
}
