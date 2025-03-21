import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { UserService } from '../user/user.service';
import { ProductList } from 'src/common/utils/ProductList';
import { DepositDto, WithdrawDto } from './dto/wallet.dto';
import { UserEntity } from '../user/entities/user.entity';
import { WalletType } from './enum/wallet.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity) private walletRepositort: Repository<WalletEntity>,
    private userService: UserService,
    private dataSource: DataSource
  ) { }

  async deposit(depositDto: DepositDto) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const { amount, fullname, mobile } = depositDto;
      const user = await this.userService.createUser({ mobile, fullname });
      const userData = await queryRunner.manager.findOneBy(UserEntity, { id: user.id });
      if (!userData) throw new Error('User not found in transaction');
      const newBalance = userData.balance + amount;
      await queryRunner.manager.update(UserEntity, { id: user.id }, { balance: newBalance });
      await queryRunner.manager.insert(WalletEntity, {
        amount,
        type: WalletType.Deposit,
        invoice_number: Date.now().toString(),
        userId: user.id,
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }

    return { message: "Payment Successfully!" }
  }

  async paymentByWallet(withdrawDto: WithdrawDto) {
    const { productId, userId } = withdrawDto
    const product = ProductList.find(product => product.id === productId);
    if (!product) throw new NotFoundException('Product not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneBy(UserEntity, { id: userId });
      if (!user) throw new NotFoundException('User not found');
      if (user.balance < product.price) throw new Error('Insufficient wallet balance');
      const updatedBalance = user.balance - product.price;
      await queryRunner.manager.update(UserEntity, { id: userId }, { balance: updatedBalance });
      await queryRunner.manager.insert(WalletEntity, {
        userId,
        productId,
        amount: product.price,
        type: WalletType.Withdraw,
        reason: "buy product" + product.name,
        invoice_number: Date.now().toString(),
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        message: 'Payment successful',
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        remainingBalance: updatedBalance,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

}
