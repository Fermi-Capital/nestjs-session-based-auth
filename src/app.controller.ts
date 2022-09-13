import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  async getHello(): Promise<any> {
    return 'hello world';
  }
}
