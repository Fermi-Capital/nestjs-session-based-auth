import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as crypto from 'crypto';

@Injectable()
export class ValidateHmacMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { signature, signature_payload } = req.body;
    // const { PATH_KEY } = req.headers;

    if (!signature || !signature_payload) {
      throw new NotAcceptableException('payload or signature not provided');
    }

    // TODO: look up partner secret kek from header
    // console.log(req.headers);

    // sorta like ftx:
    // const ts = Date.now(); // const ts = 1588591511721
    // const signature_payload = `${ts}/auth/account/2`;
    // const signature = "dbc62ec300b2624c580611858d94f2332ac636bb86eccfa1167a7777c496ee6f
    console.log(signature_payload);

    const hmac = crypto
      .createHmac('sha384', 'secret')
      .update(signature)
      .digest('hex');

    console.log(hmac);

    const computedHmac = crypto
      .createHmac('sha384', 'secret')
      .update(signature)
      .digest('hex');

    // check hmac
    if (computedHmac != hmac) {
      return console.log({ error: 'Security check failed' });
    }
    console.log('hmac payload', computedHmac, signature_payload);

    next();
  }
}
