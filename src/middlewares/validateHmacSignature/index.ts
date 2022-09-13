import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

import { HMAC_ALGO, HMAC_DIGEST } from './constants';

@Injectable()
export class ValidateHmacSignatureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { signature } = req.body;
    // const { PATH_KEY } = req.headers;

    if (!signature) {
      throw new NotAcceptableException('signature not provided');
    }

    // TODO: look up partner secret key from public key
    const PATH_API_SECRET = 'secret key';

    // TODO: update payload? does it matter?
    const hmacSignature = crypto
      .createHmac(HMAC_ALGO, PATH_API_SECRET)
      .update('account-login')
      .digest(HMAC_DIGEST);

    // check hmac
    if (hmacSignature != signature) {
      throw new NotAcceptableException('Signature check failed');
    }
    next();
  }
}
