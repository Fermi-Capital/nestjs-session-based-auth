import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ClientService } from 'src/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, password);
    const client = await this.clientService.client({ id: Number(username) });

    // auth strat with hmac
    const passwordValid = !!password;
    if (!client) {
      throw new NotAcceptableException('could not find the user');
    }
    if (client && passwordValid) {
      console.log('valid', passwordValid);
      return {
        id: client.id,
        externalClientId: client.externalClientId,
      };
    }
    return null;
  }
}
