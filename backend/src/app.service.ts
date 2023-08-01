import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return {
      status: 'OK',
      port: 5000,
    };
  }
}
