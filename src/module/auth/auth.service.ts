import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

/**
 * @deprecated
 * JWT 还需要管理服务器主动调用 login，不符合本监控服务器从消息队列中取消息的场景，因此废弃
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(id: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.validateUser(id, pass);
    if (user) {
      throw new UnauthorizedException();
    }
    const payload = {
      userId: user.userId,
      userName: user.name,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
