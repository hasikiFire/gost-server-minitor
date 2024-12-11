import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('uuid', ['userId'], { unique: true })
@Entity('user', { schema: 'shop_test' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: '主键',
    unsigned: true,
  })
  id: string;

  @Column('bigint', { name: 'uuid', unique: true, comment: '用户ID' })
  userId: string;

  @Column('varchar', { name: 'name', comment: '名字', length: 255 })
  name: string;

  @Column('varchar', { name: 'email', comment: '邮箱', length: 64 })
  email: string;

  @Column('varchar', { name: 'password_hash', comment: '哈希值', length: 255 })
  passwordHash: string;

  @Column('varchar', { name: 'salt', comment: '哈希盐值', length: 255 })
  salt: string;

  @Column('tinyint', {
    name: 'status',
    comment: '状态 1 正常 0 无效 2 已禁用（触发审计规则）',
  })
  status: number;

  @Column('int', {
    name: 'inviter_user_id',
    nullable: true,
    comment: '邀请人ID',
  })
  inviterUserId: number | null;

  @Column('varchar', {
    name: 'invite_code',
    nullable: true,
    comment: '邀请代码',
    length: 255,
  })
  inviteCode: string | null;

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
