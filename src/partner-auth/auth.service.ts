import {
  Injectable,
  NotAcceptableException,
  Scope,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as crypto from 'crypto';

@Injectable({ scope: Scope.REQUEST })
export class PartnerAuthService {
  constructor(
    @Inject(REQUEST) private request: Request, // private readonly accountService: AccountService,
  ) {}

  async validatePartner(partnerId: string): Promise<any> {
    const partnerData = { id: partnerId };

    if (!partnerData) {
      throw new NotAcceptableException('could not find the account');
    }

    // hmac strat
    const pk = true;
    //find partner based on public key
    if (!pk) {
      throw new NotAcceptableException('could not find the partner');
    }

    // const ts = 1588591511721
    // const signature_payload = b'1588591511721GET/api/markets'
    // const signature = "dbc62ec300b2624c580611858d94f2332ac636bb86eccfa1167a7777c496ee6f

    const payload = '{ accountId: 6 }';
    const hmac = crypto
      .createHmac('sha384', 'secret')
      .update('{ accountId: 6 }')
      .digest('hex');

    console.log(hmac);

    const computedHmac = crypto
      .createHmac('sha384', 'secret')
      .update(payload)
      .digest('hex');

    // check hmac
    if (computedHmac != hmac) {
      return console.log({ error: 'Security check failed' });
    }
    console.log('hmac payload', computedHmac);

    return partnerData;
  }
}
