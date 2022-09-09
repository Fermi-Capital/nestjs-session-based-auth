import { Controller, Get } from '@nestjs/common';
import { PartnerAuthService } from './partner-auth/auth.service';

@Controller('/')
export class AppController {
  constructor(private readonly partnerAuthService: PartnerAuthService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.partnerAuthService.validatePartner('1');
  }
}
