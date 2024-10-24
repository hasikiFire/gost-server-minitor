import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_log', { schema: 'shop_test' })
export class AuditLog {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('bigint', { name: 'user_id', comment: '用户ID' })
  userId: string;

  @Column('varchar', { name: 'node_name', comment: '节点名称', length: 255 })
  nodeName: string;

  @Column('varchar', { name: 'rule_name', comment: '规则名称', length: 255 })
  ruleName: string;

  @Column('bigint', {
    name: 'trigger_count',
    comment: '触发次数',
    unsigned: true,
    default: () => "'0'",
  })
  triggerCount: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;
}
