/*
https://docs.nestjs.com/providers#services
*/

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICacheKey } from 'src/common/constanst';
import { MyLoggerService } from 'src/common/logger/logger.service';
import { RequestService } from 'src/common/request/request.service';
import { IGostReponse } from 'src/common/types/gost';
import { Cache } from 'cache-manager';

@Injectable()
export class GatewayService {
  private allowedMethods: string[] = [
    'addGostService',
    'deleteGostService',
    'deleteExpiredPackage',
    'updateUserPassword',
    'deleteExpiredPackage',
  ];
  private readonly host: string;

  constructor(
    private readonly requestService: RequestService,
    private readonly configService: ConfigService,
    private readonly logger: MyLoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.host = this.configService.get<string>('GOST_HOST');
  }

  async handleRequest(method: string, params: any): Promise<any> {
    if (this.allowedMethods.includes(method)) {
      try {
        // 动态调用 allowedMethods 列表中的方法
        return await this[method](params);
      } catch (error) {
        throw new Error(
          `Error invoking method: ${method}, details: ${error.message}`,
        );
      }
    } else {
      throw new Error(`Method ${method} is not allowed or does not exist.`);
    }
  }

  /**
   * 新增 GOST service
   * 请求 GOST API 并创建新的服务
   */
  async addGostService(serviceData: any): Promise<IBaseResponse> {
    console.log('serviceData: ', serviceData);
    try {
      const params = {
        // name: `service-${v.id}`,
        // 获取现有 server port + 1
        // addr: `:${this.beginPort + index}`,
        handler: {
          type: 'http2',
        },
        listener: {
          type: 'http2',
        },
        observer: 'observer-0',
        metadata: {
          knock: 'www.google.com',
          probeResist: 'file:/var/www/html/index.html',
          enableStats: 'true',
          observePeriod: '120s',
        },
      };
      // console.log('params: ', params);
      const data = await this.requestService.post<IGostReponse>(
        `${this.host}/api/config/services`,
        params,
      );

      // console.log('data: ', data);
      if (data.msg === 'OK') {
        this.logger.log('[GostService][loadService] add Service success');
      }

      return {
        code: 200,
        message: '增加服务成功',
        data,
      };
    } catch (error) {
      throw new Error('新增 GOST service 失败: ' + error.message);
    }
  }

  /**
   * 删除 GOST service
   * 请求 GOST API 并删除指定的服务
   */
  async deleteGostService(serviceId: string): Promise<IBaseResponse> {
    try {
      const data = await this.requestService.delete<IGostReponse>(
        `${this.host}/api/config/services/${serviceId}`,
      );

      if (data.msg === 'OK') {
        this.logger.log(
          '[GostService][loadService] add Service success',
          serviceId,
        );
      }

      return {
        code: 200,
        message: '删除成功',
        data,
      };
    } catch (error) {
      throw new Error('删除 GOST service 失败: ' + error.message);
    }
  }

  async deleteExpiredPackage(userID: string): Promise<IBaseResponse> {
    try {
      this.deleteUserCache(userID);
      return {
        code: 200,
        message: '删除套餐缓存成功',
      };
    } catch (error) {
      console.error('处理套餐到期时出错:', error);
    }
  }

  /**
   * 删除用户的缓存信息
   * 删除缓存让用户无法通过认证
   */
  async deleteUser(userId: string): Promise<IBaseResponse> {
    try {
      this.deleteUserCache(userId);
      return {
        code: 200,
        message: '删除用户缓存成功',
      };
    } catch (error) {
      throw new Error(`删除缓存失败: ${error.message}`);
    }
  }

  async updateUserPassword(userId: string): Promise<IBaseResponse> {
    try {
      await this.deleteUserCache(userId);
      return {
        code: 200,
        message: '删除用户缓存成功',
      };
    } catch (error) {
      throw new Error(`修改用户密码失败: ${error.message}`);
    }
  }

  private deleteUserCache(userID: string) {
    try {
      const lKey = `${ICacheKey.LIMITER}-${userID}`;
      const aKey = `${ICacheKey.AUTH}-${userID}`;
      this.cacheManager.del(lKey);
      this.cacheManager.del(aKey);
    } catch (error) {
      throw new Error(
        `删除用户缓存失败,id: ${userID}, msg: : ${error.message}`,
      );
    }
  }
}
