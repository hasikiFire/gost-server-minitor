import { Injectable } from '@nestjs/common';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
import { HttpService } from '@nestjs/axios';

// 对外暴露 gost 方法-编辑套餐
// 对内初始化 gost 数据
@Injectable()
export class GostService {
  // 给 9001 端口
  constructor(
    private readonly usageRecordService: UsageRecordService,
    private readonly httpService: HttpService,
  ) {}
  async loadConfig() {
    const users = await this.usageRecordService.findValidUsers();
    console.log('users: ', users);
    const limits = await this.usageRecordService.findValidPackageitem();
    console.log('limits: ', limits);
    // Auther
    // Limiter
    // const requestBody = {
    //   addr: ':9011',
    //   handler: {
    //     type: 'http2',
    //   },
    //   listener: {
    //     type: 'http2',
    //   },
    //   observer: 'observer-0',
    //   metadata: {
    //     enablestats: true,
    //     knock: 'www.google.com',
    //     proberesist: 'file:/var/www/html/index.html',
    //   },
    // };

    // const response = await firstValueFrom(
    //   this.httpService.post(
    //     'http://3.1.6.157:9001/api/config/services',
    //     requestBody,
    //   ),
    // );

    // console.log('Response from API:', response.data);
  }
}
