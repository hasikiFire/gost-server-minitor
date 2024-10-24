import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestService } from 'src/common/request/request.service';
import { MyLoggerService } from 'src/common/logger/logger.service';
import { IGostReponse } from 'src/common/types/gost';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
import { DefaultGostConfig } from 'src/config/gost/gostConfig';
// 对外暴露 gost 方法-编辑套餐
// 对内初始化 gost 数据

@Injectable()
export class ConfigureService {
  private readonly gostHost: string;
  private readonly beginPort: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly usageRecordService: UsageRecordService,
    private readonly logger: MyLoggerService,
  ) {
    this.gostHost = this.configService.get<string>('gost.host');
    this.beginPort = Number(this.configService.get<string>('app.host')) + 2; // 前两位给 gost api 用
  }

  async loadConfig() {
    // TODO 暂时关闭
    // this.loadService();
    // 废弃 PluginService auth 接口
    // this.loadUsers();
    // 废弃 流量限制通过 PluginService limiter 接口
    // this.loadLimiter();
  }
  /**
   * 权宜之计，等handler能观测就不用这么干，在新增套餐里去新增 services
   * @returns
   */
  async loadService() {
    const users = await this.usageRecordService.findValidUsers();
    // console.log('loadService users: ', users);
    if (!users?.length) {
      this.logger.log('[GostService][loadService] no users add');
      return;
    }

    users.forEach(async (v, index) => {
      try {
        const params = {
          name: `service-${v.id}`,
          addr: `:${this.beginPort + index}`,
          ...DefaultGostConfig,
        };
        // console.log('params: ', params);
        const data = await this.requestService.post<IGostReponse>(
          `${this.gostHost}/api/config/services`,
          params,
        );

        // console.log('data: ', data);
        if (data.msg === 'OK') {
          this.logger.log(
            '[GostService][loadService] add Service success',
            params.name,
          );
        }
      } catch (e) {
        this.logger.error('[GostService][loadService] add Service faild', e);
      }
    });
  }

  /**
   * @deprecated 废弃 PluginService auth 接口
   * @returns
   */
  // async loadUsers() {
  //   const users = await this.usageRecordService.findValidUsers();
  //   if (!users?.length) {
  //     this.logger.log('[GostService][loadLimiter] no users add');
  //     return;
  //   }

  //   try {
  //     const params = {
  //       name: `auther-0`,
  //       auths: users.map((v) => ({
  //         username: `user${v.id}`, // 必须唯一，不然最后会覆盖前面的
  //         password: v.passwordHash,
  //       })),
  //     };
  //     const data = await this.requestService.post<IGostReponse>(
  //       `${this.host}/api/config/authers`,
  //       params,
  //     );

  //     if (data.msg === 'OK') {
  //       this.logger.log(
  //         '[GostService][loadUsers] add user success',
  //         params.name,
  //       );
  //     }
  //   } catch (e) {
  //     this.logger.error('[GostService][loadUsers] add user faild', e.msg);
  //   }
  // }

  /**
   * @deprecated 废弃 流量限制通过 PluginService limiter 接口
   * @returns
   */
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
          `${this.gostHost}/api/config/limiters`,
          params,
        );

        if (data.msg === 'OK') {
          this.logger.log(
            '[GostService][loadLimiter] add Limiter success',
            params.name,
          );
        }
      } catch (e) {
        this.logger.error('[GostService][loadLimiter] add Limiter faild', e);
      }
    });
  }
}
