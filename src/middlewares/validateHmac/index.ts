import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as crypto from 'crypto';
import { HMAC_ALGO, HMAC_DIGEST } from './constants';

@Injectable()
export class ValidateHmacMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { signature } = req.body;
    // const { PATH_KEY } = req.headers;
    // const PATH_KEY = 'public key';

    if (!signature) {
      throw new NotAcceptableException('signature not provided');
    }

    // TODO: look up partner secret key from public key
    // console.log(req.headers);
    const PATH_API_SECRET = 'secret key';

    const hmacSignature = crypto
      .createHmac(HMAC_ALGO, PATH_API_SECRET)
      .update(signature)
      .digest(HMAC_DIGEST);
    console.log(hmacSignature);
    // check hmac
    if (hmacSignature != signature) {
      throw new NotAcceptableException('Signature check failed');
    }
    console.log('hmac payload', hmacSignature);

    next();
  }
}
