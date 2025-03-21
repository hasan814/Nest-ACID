import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DepositDto, WithdrawDto } from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.walletService.deposit(depositDto)
  }

  @Post('widthdraw')
  widthdraw(@Body() widthdrawDto: WithdrawDto) {
    return this.walletService.paymentByWallet(widthdrawDto)
  }
}
