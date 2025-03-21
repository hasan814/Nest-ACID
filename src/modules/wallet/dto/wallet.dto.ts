import {
  IsString,
  IsNotEmpty,
  IsMobilePhone,
  IsNumber,
  Min,
} from 'class-validator';

export class DepositDto {
  @IsString()
  @IsNotEmpty({ message: 'Fullname is required' })
  fullname: string;

  @IsMobilePhone('fa-IR', {}, { message: 'Mobile number is not valid' })
  mobile: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(1000, { message: 'Minimum deposit amount is 1000' })
  amount: number;
}
