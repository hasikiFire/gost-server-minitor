import { Injectable } from '@nestjs/common';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
import { ConfigService } from '@nestjs/config';
import { RequestService } from 'src/common/request/request.service';
import { MyLoggerService } from 'src/common/logger/logger.service';
import { IGostReponse } from 'src/common/types/gost';
// 对外暴露 gost 方法-编辑套餐
// 对内初始化 gost 数据
@Injectable()
export class GostService {
  private readonly host: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly usageRecordService: UsageRecordService,
    private readonly logger: MyLoggerService,
  ) {
    this.host = this.configService.get<string>('GOST_HOST');
  }

  async loadConfig() {
    // 增量更新0.02
    this.loadUsers();
    this.loadLimiter();
  }
  async loadUsers() {
    const users = await this.usageRecordService.findValidUsers();
    if (!users?.length) {
      this.logger.log('[GostService][loadLimiter] no users add');
      return;
    }

    try {
      const params = {
        name: `auther-0`,
        auths: users.map((v) => ({
          username: `user${v.id}`, // 必须唯一，不然最后会覆盖前面的
          password: v.passwordHash,
        })),
      };
      const data = await this.requestService.post<IGostReponse>(
        `${this.host}/api/config/authers`,
        params,
      );

      if (data.msg === 'OK') {
        this.logger.log(
          '[GostService][loadUsers] add user success',
          params.name,
        );
      }
    } catch (e) {
      this.logger.error('[GostService][loadUsers] add user faild', e.msg);
    }
  }
  async loadLimiter() {
    const packageItems = await this.usageRecordService.findValidPackageitem();
    if (!packageItems?.length) {
      this.logger.log('[GostService][loadLimiter] no limiter add');
      return;
    }

    packageItems.forEach(async (v) => {
      try {
        const params = {
          name: `limiter-${v.id}-test`,
          limits: [`$$ ${v.speedLimit}MB ${v.speedLimit}MB`],
        };
        const data = await this.requestService.post<IGostReponse>(
          `${this.host}/api/config/limiters`,
          params,
        );

        if (data.msg === 'OK') {
          this.logger.log(
            '[GostService][loadLimiter] add Limiter success',
            params.name,
          );
        }
      } catch (e) {
        this.logger.error(
          '[GostService][loadLimiter] add Limiter faild',
          e.msg,
        );
      }
    });
  }
}
