import { Test, TestingModule } from '@nestjs/testing';
import { PartnerAuthService } from './auth.service';

describe('AuthService', () => {
  let service: PartnerAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerAuthService],
    }).compile();

    service = module.get<PartnerAuthService>(PartnerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
