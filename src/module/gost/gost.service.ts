import { Injectable } from '@nestjs/common';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
import { ConfigService } from '@nestjs/config';
import { RequestService } from 'src/common/request/request.service';
// 对外暴露 gost 方法-编辑套餐
// 对内初始化 gost 数据
@Injectable()
export class GostService {
  // 给 9001 端口
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly usageRecordService: UsageRecordService,
  ) {}

  async loadConfig() {
    const users = await this.usageRecordService.findValidUsers();
    console.log('users: ', users);
    const limits = await this.usageRecordService.findValidPackageitem();
    console.log('limits: ', limits);
    // add Auther
    // add Limiter
    // const requestBody = {
    //   observer: 'observer-0',
    // };
    const host = this.configService.get('GOST_HOSE');
    console.log('host: ', host);

    try {
      // 发送 GET 请求
      const data = await this.requestService.get(`${host}/api/config`);
      console.log('data: ', data);

      return data;
    } catch (error) {
      // 处理错误
      console.error('Error fetching data:', error);
    }
  }
}
