/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForeignServer } from 'src/common/entities/ForeignServer';
import SystemInfo from 'src/common/os/SystemInfo';
import { Repository } from 'typeorm';
import { MyLoggerService } from '../help/logger/logger.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ServerService {
  private ip4: string;
  constructor(
    @InjectRepository(ForeignServer)
    private readonly foreignServerRepository: Repository<ForeignServer>,

    private readonly logger: MyLoggerService,
  ) {
    this.initServerStatus();
  }

  /**
   * 加载服务器数据到数据库
   */
  async initServerStatus() {
    const ip4s = await SystemInfo.getIPAddresses();
    this.ip4 = ip4s.length ? ip4s[0] : '';
    this.logger.log('[serverService] initServerStatus server ip: ', this.ip4);

    const serverData = await this.foreignServerRepository.findOne({
      where: {
        ipAddress: this.ip4,
      },
    });
    if (!serverData) {
      this.logger.error('[serverService] initServerStatus no server data!!');
      return;
    }
    if (serverData.status === 0) {
      serverData.status = 1;
    }
    await this.foreignServerRepository.save(serverData);
    this.logger.log('[serverService] initServerStatus success!!');
  }

  // @Cron('*/1 * * * *')
  async refreshServerStatus() {
    this.logger.debug('[serverService] Updating server status...');

    const serverData = await this.foreignServerRepository.findOne({
      where: {
        ipAddress: this.ip4,
      },
    });
    if (!serverData) {
      this.logger.error('[serverService] initServerStatus no server data!!');
      return;
    }

    serverData.status = 1;
    const memeryInfo = await SystemInfo.getMemoryInfo();
    serverData.ramGb = this.byteToGb(memeryInfo.total);
    serverData.remainingRamGb = this.byteToGb(memeryInfo.free);

    const cpuInfo = await SystemInfo.getCpuInfo();
    serverData.cpuCores = cpuInfo.cores;

    const diskInfo = await SystemInfo.getDiskInfo();
    serverData.storageGb = this.byteToGb(
      diskInfo.reduce((acc, cur) => acc + cur.size, 0),
    );
    serverData.consumedStorageGb = this.byteToGb(
      diskInfo.reduce((acc, cur) => acc + cur.used, 0),
    );

    this.logger.log(
      '[serverService] refreshServerStatus serverData',
      JSON.stringify(serverData),
    );
    await this.foreignServerRepository.save(serverData);
    this.logger.log('[serverService] refreshServerStatus success!!');
  }

  byteToGb(bytes: number) {
    if (!bytes) return 0;
    return Number((bytes / 1024 / 1024 / 1024).toFixed(2));
  }

  /**
   *  统计本 node 服务器的流量用量
   * @param incrementMap
   *
   */
  async updateServeWithLock(incrementMap: Record<number, number>) {
    try {
      await this.foreignServerRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const serverData = await transactionalEntityManager
            .createQueryBuilder(ForeignServer, 'foreignServer')
            .setLock('pessimistic_write') // 行级锁
            .where('foreignServer.ipAddress = :ipAddress', {
              ipAddress: this.ip4,
            })
            .getOne();
          if (!serverData) {
            this.logger.warn('[pluginService][listenGost]  no server data!!');
            return;
          }
          const allBytes = Object.keys(incrementMap).reduce(
            (pre, cur) => pre + incrementMap[cur],
            0,
          );
          const gb = Number((allBytes / 1024 / 1024 / 1024).toFixed(4));
          serverData.consumedDataTransfer += gb;
          if (gb >= serverData.consumedStorageGb) {
            serverData.status = 2;
          }

          await transactionalEntityManager.save(serverData);
          this.logger.log(
            '[pluginService][listenGost]  update server data success',
          );
        },
      );
    } catch (e) {
      this.logger.error('[pluginService][listenGost]  update server faild', e);
    }
  }
}
