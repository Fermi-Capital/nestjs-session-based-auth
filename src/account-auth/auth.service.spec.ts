import { Test, TestingModule } from '@nestjs/testing';
import { AccountAuthService } from './auth.service';

describe('AuthService', () => {
  let service: AccountAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountAuthService],
    }).compile();

    service = module.get<AccountAuthService>(AccountAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
