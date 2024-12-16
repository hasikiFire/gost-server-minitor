import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usage_record', { schema: 'shop_test' })
export class UsageRecord {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: '主键',
    unsigned: true,
  })
  id: string;

  @Column('bigint', { name: 'package_id', comment: '套餐计划主键' })
  packageId: string;

  @Column('varchar', { name: 'order_code', comment: '订单号', length: 50 })
  orderCode: string;

  @Column('bigint', { name: 'user_id', comment: '用户ID' })
  userId: string;

  @Column('int', {
    name: 'purchase_status',
    comment: '套餐状态 0:未开始 1：生效中 2：流量已用尽 3：已过期 ',
    default: () => "'0'",
  })
  purchaseStatus: number;

  @Column('timestamp', { name: 'purchase_start_time', comment: '开始日期' })
  purchaseStartTime: Date;

  @Column('timestamp', { name: 'purchase_end_time', comment: '结束日期' })
  purchaseEndTime: Date;

  @Column('int', {
    name: 'consumed_data_transfer',
    nullable: true,
    comment: '用户已消耗的流量（以MB为单位）',
  })
  consumedDataTransfer: number | null;

  @Column('int', {
    name: 'speed_limit',
    nullable: true,
    comment: '数据流量限额（单位：GB）',
  })
  speedLimit: number;

  @Column('int', {
    name: 'data_allowance',
    comment: '数据流量限额（单位：GB）',
  })
  dataAllowance: number;

  @Column('int', {
    name: 'device_num',
    nullable: true,
    comment: '在线的设备数量',
  })
  deviceNum: number | null;

  @Column('varchar', {
    name: 'subscription_link',
    nullable: true,
    comment: '订阅链接',
    length: 255,
  })
  subscriptionLink: string | null;

  @Column('timestamp', {
    name: 'created_at',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('tinyint', {
    name: 'deleted',
    nullable: true,
    comment: '是否已删除 1：已删除 0：未删除',
    default: () => "'0'",
  })
  deleted: number | null;
}
