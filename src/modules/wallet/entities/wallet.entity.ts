import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { WalletType } from "../enum/wallet.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity(EntityName.Wallet)
export class WalletEntity extends BaseEntity {
  @Column({ type: "enum", enum: WalletType })
  type: string

  @Column()
  invoice_number: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  userId: number

  @ManyToOne(() => UserEntity, user => user.transactions, { onDelete: "CASCADE" })
  user: UserEntity
}
