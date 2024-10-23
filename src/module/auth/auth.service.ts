import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

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
