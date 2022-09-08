import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AccountService } from 'src/accounts/accounts.service';
import jwt from 'jsonwebtoken';
// import {
//   generateKeyPairSync,
//   publicEncrypt,
//   privateDecrypt,
//   constants,
// } from 'crypto';
import { Account } from '@prisma/client';

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key

@Injectable()
export class AccountAuthService {
  constructor(private readonly accountService: AccountService) {}
  async validateUser(accountId: Account['id']): Promise<any> {
    // const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    //   // The standard secure default length for RSA keys is 2048 bits
    //   modulusLength: 2048,
    // });

    // // would be request
    // const data = 'my secret data';

    // const encryptedData = publicEncrypt(
    //   {
    //     key: publicKey,
    //     padding: constants.RSA_PKCS1_OAEP_PADDING,
    //     oaepHash: 'sha256',
    //   },
    //   // We convert the data string to a buffer using `Buffer.from`
    //   Buffer.from(data),
    // );

    // // The encrypted data is in the form of bytes, so we print it in base64 format
    // // so that it's displayed in a more readable form
    // console.log('encypted data: ', encryptedData.toString('base64'));

    // const decryptedData = privateDecrypt(
    //   {
    //     key: privateKey,
    //     // In order to decrypt the data, we need to specify the
    //     // same hashing function and padding scheme that we used to
    //     // encrypt the data in the previous step
    //     padding: constants.RSA_PKCS1_OAEP_PADDING,
    //     oaepHash: 'sha256',
    //   },
    //   encryptedData,
    // );

    // // The decrypted data is of the Buffer type, which we can convert to a
    // // string to reveal the original data
    // console.log('decrypted data: ', decryptedData.toString());

    const accountData = await this.accountService.account({
      id: Number(accountId),
    });

    // auth strat with hmac
    const validAccount = !!accountData;
    if (!validAccount) {
      throw new NotAcceptableException('could not find the account');
    }
    const accountJwt = jwt.sign(
      {
        accountId: accountData.id,
        clientId: accountData.clientId,
      },
      'SetStrongSecretInDotEnv',
    );

    return accountJwt;
  }
}
