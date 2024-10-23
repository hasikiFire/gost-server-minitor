import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ILoginResDTP } from 'src/DTO/userDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 仅仅用于双系统通信，不对用户暴露
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: ILoginResDTP) {
    return this.authService.signIn(signInDto.userID, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
