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
    const { signature, signature_payload } = req.body;
    // const { PATH_KEY } = req.headers;
    // const PATH_KEY = 'public key';

    if (!signature || !signature_payload) {
      throw new NotAcceptableException('payload or signature not provided');
    }

    // TODO: look up partner secret keY from header public key
    // console.log(req.headers);
    const PATH_API_SECRET = 'secret key';

    // sorta like ftx:
    // const ts = Date.now(); // const ts = 1588591511721
    // const signature_payload = `${ts}/auth/account/2`;
    // const signature = "dbc62ec300b2624c580611858d94f2332ac636bb86eccfa1167a7777c496ee6f
    console.log(signature_payload);

    const hmac = crypto
      .createHmac(HMAC_ALGO, PATH_API_SECRET)
      .update(signature)
      .digest(HMAC_DIGEST);

    console.log(hmac);

    const computedHmac = crypto
      .createHmac(HMAC_ALGO, PATH_API_SECRET)
      .update(signature)
      .digest(HMAC_DIGEST);

    // check hmac
    if (computedHmac != hmac) {
      throw new NotAcceptableException('HMAC Security check failed');
    }
    console.log('hmac payload', computedHmac, signature_payload);

    next();
  }
}
