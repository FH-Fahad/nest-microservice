import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(body: { email: string, password: string }): Promise<{ email: string, password: string }> {
    console.log('body from microservice', body);
    const { email, password } = body;

    const hashedPassword = await this.hashPassword(password);
    return { email, password: hashedPassword };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
