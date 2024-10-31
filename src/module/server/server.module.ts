import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerService } from './server.service';
import { Module } from '@nestjs/common';
import { ForeignServer } from 'src/common/entities/ForeignServer';

@Module({
  imports: [TypeOrmModule.forFeature([ForeignServer])],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
