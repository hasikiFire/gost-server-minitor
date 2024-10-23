import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userID: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id: userID,
      },
    });
    if (!user) return;
    return user;
  }

  async validateUser(
    userID: string,
    password: string,
  ): Promise<Partial<User> | undefined> {
    const user = await this.findOne(userID); // 从数据库获取用户信息
    if (!user) return;
    const isPass = await this.verifyPassword(
      password,
      user.passwordHash,
      user.salt,
    );
    if (!isPass) return;

    delete user.passwordHash;
    delete user.salt;
    return user;
  }

  private async verifyPassword(
    password: string,
    hash: string,
    salt: string,
  ): Promise<boolean> {
    const hashToCompare = await bcrypt.hash(password, salt); // 使用同样的 salt 对输入的密码进行 hash
    return hash === hashToCompare; // 比较数据库中的 hash 和生成的 hash 是否相等
  }
}
