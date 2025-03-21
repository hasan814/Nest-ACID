import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import { WalletEntity } from "src/modules/wallet/entities/wallet.entity";
import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityName } from "src/common/enums/entity.enum";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column()
  fullname: string;

  @Column()
  mobile: string;

  @Column({ type: "numeric", default: 0 })
  balance: number

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => WalletEntity, wallet => wallet.user)
  transactions: WalletEntity[]
}
