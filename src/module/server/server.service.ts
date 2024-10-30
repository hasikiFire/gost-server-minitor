/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForeignServer } from 'src/common/entities/ForeignServer';
import networkInfo from 'src/common/os/NetworkInfo';
import { Repository } from 'typeorm';
import { MyLoggerService } from '../help/logger/logger.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ForeignServer)
    private readonly foreignServerRepository: Repository<ForeignServer>,

    private readonly logger: MyLoggerService,
  ) {
    this.initServer();
  }

  /**
   * 加载服务器数据到数据库
   */
  async initServer() {
    // TODO
  }

  /**
   *  统计本 node 服务器的流量用量
   * @param incrementMap
   *
   */
  async updateServeWithLock(incrementMap: Record<number, number>) {
    const ip4s = await networkInfo.getIPAddresses();

    try {
      await this.foreignServerRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const serverData = await transactionalEntityManager
            .createQueryBuilder(ForeignServer, 'foreignServer')
            .setLock('pessimistic_write') // 行级锁
            .where('foreignServer.ipAddress = :ipAddress', { ipAddress: ip4s })
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
