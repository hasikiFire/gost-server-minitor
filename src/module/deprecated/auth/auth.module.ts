// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.controller';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// /**
//  * @deprecated
//  * JWT 还需要管理服务器主动调用 login，不符合本监控服务器从消息队列中取消息的场景，因此废弃
//  */
// @Module({
//   imports: [
//     UsersModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         global: true,
//         secret: configService.get<string>('JWT_SECRETKEY'), // 从环境变量获取 JWT 密钥
//         signOptions: {
//           expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '60s',
//         }, // 从环境变量获取过期时间
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [AuthService],
//   controllers: [AuthController, AuthController],
//   exports: [AuthService],
// })
// export class AuthModule {}
