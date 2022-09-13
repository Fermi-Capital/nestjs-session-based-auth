import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateAccountJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accountJwt = req.session.jwt;
    // account jwt not valid
    if (!accountJwt) {
      throw new Error('Account not logged in ');
    }
    // assign valid account object on request
    const validAccount = jwt.verify(accountJwt, process.env.JWT_KEY) as any;
    req.account = validAccount;
    next();
  }
}
