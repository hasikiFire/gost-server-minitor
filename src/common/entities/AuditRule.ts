import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_rule", ["ruleName"], {})
@Entity("audit_rule", { schema: "shop_test" })
export class AuditRule {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("varchar", { name: "name", comment: "名称", length: 255 })
  name: string;

  @Column("varchar", { name: "rule_name", comment: "规则", length: 255 })
  ruleName: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;
}
