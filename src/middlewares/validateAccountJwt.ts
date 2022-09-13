import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateAccountJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accountJwt = req.session.jwt;
    // account jwt not valid
    if (!accountJwt) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    // assign valid account object on request
    const validAccount = jwt.verify(accountJwt, process.env.JWT_KEY) as Account;
    req.account = validAccount;
    next();
  }
}
