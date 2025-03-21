import { IsString, IsNotEmpty, IsMobilePhone, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsMobilePhone('fa-IR')
  mobile: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNumber()
  amount: number;
}
